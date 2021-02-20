from flask import Flask, render_template, request
import youtube_dl as ydl
from pytube import YouTube, extract
from os import path

app = Flask(__name__)
VID_DIR='./videos'

@app.route('/')
def welcome():
    return 'hello tis I, nutshell'

@app.route('/ibmz')
def ibmz():
    return "<p style=\"font-size:100px\">&#10024; IBM-Z IS GREAT &#10024;</p>"

@app.route('/download')
def download():
    yt_url = input('Input YouTube URL: ')
    print("Downloading...")
    video = YouTube(yt_url)
    video.streams[0].download(VID_DIR)
    print("Download completed!!")
    print("Length of video: ", video.length, "seconds")
    # uh gotta have a way to check if a video is already downloaded?
    # get a way to change mp4 to wav or flac

@app.route('/api/submit', methods = ['POST'])
def submit():
    print(request.json['url'])
    if request.json is None:
        return 'ERROR: no JSON in request body'
    yt_url = request.json['url']
    if not yt_url.startswith('https://youtube.com/') and not yt_url.startswith('https://www.youtube.com/'):
        return { 'success': False, 'message': 'Invalid URL' }

    vid_id = extract.video_id(yt_url)
    filename = path.join(VID_DIR, f'{vid_id}.mp4')
    return filename

'''
downloading video
transcribing video
summarzing text
splitting video
stitching video
'''

if __name__ == '__main__':
    app.run()