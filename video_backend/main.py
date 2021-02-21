from flask import Flask, request
from pytube import YouTube, extract
import psycopg2
import json
from lib.pipeline import *
from flask_socketio import SocketIO, send, emit
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")

VID_DIR='./videos'
lookup = {}

con = psycopg2.connect(database="postgres", user="postgres", password="almond", host="34.94.74.255", port="5432")
print("Database opened successfully", flush=True)

@app.route('/')
def welcome():
    return 'hello tis I, nutshell'

@app.route('/ibmz')
def ibmz():
    return "<p style=\"font-size:100px\">&#10024; IBM-Z IS GREAT &#10024;</p>"

def update_progress(vid_id, stage):
    cur = con.cursor()
    cur.execute("UPDATE nutstash.nutstash SET stage=%s WHERE vid_id = %s", (stage, vid_id))
    con.commit()
    if vid_id not in lookup:
        print('WARNING: unregistered socket')
    socketio.emit('statusUpdate', {
        'stage': stage
    }, room=lookup[vid_id])
    print(f'Moved on to stage: {stage}')

@app.route('/submit', methods = ['POST'])
def submit():
    if request.json is None or 'videoLink' not in request.json or 'videoPercentage' not in request.json:
        return 'ERROR: no JSON in request body'

    print(request.json['videoLink'])
    yt_url = request.json['videoLink']
    video = YouTube(yt_url)
    vid_id = extract.video_id(yt_url)
    vidPerc = request.json['videoPercentage']

    cur = con.cursor()
    cur.execute("SELECT vid_id FROM nutstash.nutstash WHERE vid_id = %s", (vid_id,))
    rows = cur.fetchall()
    if rows:
        return { 'success': True, 'alreadyShortened': True, 'videoId': vid_id }

    # unique index prevents race condition
    cur = con.cursor()
    try:
        cur.execute("INSERT INTO nutstash.nutstash (videolink, vid_id, percent, stage) VALUES (%s, %s, %s, %s)",
            (yt_url, vid_id, vidPerc, 'pending'))
    except Exception as e:
        print(f'Failed to commit: {e}')
        con.rollback()
    else:
        con.commit()

    if not yt_url.startswith('https://youtube.com/') and not yt_url.startswith('https://www.youtube.com/'):
        return { 'success': False, 'message': 'Invalid URL' }
    return { 'success': True, 'videoId': vid_id, 'alreadyShortened': False }


    # filename = f'{vid_id}'
    # video.streams[0].download(VID_DIR, filename)
    # print("Length of video: ", video.length, "seconds")

    # return filename

# @app.route('/video/<videoId>', methods = ['GET'])
# def video(videoId):
#     cur = con.cursor()
#     cur.execute("SELECT shortenedLink, timeandsentence, videoLink, stats, sections FROM nutstash.nutstash WHERE vid_id = %s", (videoId,))
#     rows = cur.fetchall()

#     return {
#         'shortenedLink': rows[0][0],
#         'timeAndSentence': rows[0][1],
#         'videoLink': rows[0][2],
#         'stats': rows[0][3],
#         'sections': rows[0][4]
#     }

@app.route('/process/<videoId>', methods = ['GET'])
def video(videoId):
    cur = con.cursor()
    cur.execute("SELECT videolink, percent FROM nutstash.nutstash WHERE vid_id = %s", (videoId,))
    rows = cur.fetchall()
    if not rows:
        return { 'status': 'fail', 'message': 'Invalid video ID' }
    video_link, percent = rows[0]
    process_video(video_link, con, ratio=percent/100, cb=update_progress)
    socketio.emit('statusUpdate', {
        'stage': 'done',
        'percentage': percent,
        'videoId': videoId
    }, room=lookup[videoId])
    return { 'status': 'success' }

@socketio.on('connect')
def test_connect():
    print('Connected!')

@socketio.on('disconnect')
def test_disconnect():
    print('Disconnected!')

@socketio.on('setVideo')
def socket_set_vid(val):
    print(f'Set video: {val}; {request.sid}')
    vid_id = extract.video_id(val)
    lookup[vid_id] = request.sid

if __name__ == '__main__':
    app.run()
