from flask import Flask, render_template, request
import requests
import youtube_dl as ydl
from pytube import YouTube, extract
from os import path
import psycopg2


app = Flask(__name__)

VID_DIR='./videos'

con = psycopg2.connect(database="postgres", user="postgres", password="almond", host="34.94.74.255", port="5432")
print("Database opened successfully", flush=True)

@app.route('/')
def welcome():
    return 'hello tis I, nutshell'

@app.route('/ibmz')
def ibmz():
    return "<p style=\"font-size:100px\">&#10024; IBM-Z IS GREAT &#10024;</p>"

@app.route('/api/submit', methods = ['POST'])
def submit():
    if request.json is None:
        return 'ERROR: no JSON in request body'

    print(request.json['videoLink'])
    global yt_url
    yt_url = request.json['videoLink']
    video = YouTube(yt_url)

    vidPerc = request.json['videoPercentage']

    if not yt_url.startswith('https://youtube.com/') and not yt_url.startswith('https://www.youtube.com/'):
        return { 'success': False, 'message': 'Invalid URL' }

    global vid_id 
    vid_id = extract.video_id(yt_url)
    filename = f'{vid_id}'
    video.streams[0].download(VID_DIR, filename)
    print("Length of video: ", video.length, "seconds")

    return filename

@app.route('/api/video/<videoId>', methods = ['GET'])
def video(videoId):
    cur = con.cursor()
    cur.execute("SELECT shortenedLink, timeandsentence, videoLink, stats, sections FROM nutstash.nutstash WHERE vid_id = %s", (videoId,))
    rows = cur.fetchall()

    return {
            'shortenedLink': rows[0][0],
            'timeAndSentence': rows[0][1],
            'videoLink': rows[0][2],
            'stats': rows[0][3],
            'sections': rows[0][4]
            }

'''
downloading video
transcribing video
summarzing text
splitting video
stitching video
'''

if __name__ == '__main__':
    app.run()