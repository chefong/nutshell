from flask import Flask, render_template
# import youtube_dl as ydl
from pytube import YouTube

app = Flask(__name__)

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
    video.streams[0].download('./videos/')
    print("Download completed!!")
    print("Length of video: ", video.length, "seconds")
    # uh gotta have a way to check if a video is already downloaded?
    # get a way to change mp4 to wav or flac

@app.route('/api/submit', methods = ['POST'])
def submit():
    pass
    # print(request.json['url'])
    # if request.json is None:
    #     return 'ERROR: no JSON in request body'
    # yt_url = request.json['url']
    # if not yt_url.startswith('https://youtube.com/') and not yt_url.startswith('https://www.youtube.com/'):
    #     return { 'success': False, 'message': 'Invalid URL' }

    # ydl = youtube_dl.YoutubeDL({
    #     'forceduration': True, 
    #     'forceid': True, 
    #     'outtmpl': path.join(VID_DIR, '%(id)s.%(ext)s'), 
    #     'format': 'mp4'})
    
    # sID = "a6kO--KRJBk"
    # with youtube_dl.YoutubeDL(ydl_opts) as ydl:
    #     dictMeta = ydl.extract_info(
    #         "https://www.youtube.com/watch?v={sID}".format(sID=sID),
    #         download=True
    #     )

    # dictMeta['duration']
    # print('yeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')

    # vid_id = result['id']
    # filename = path.join(VID_DIR, f'{vid_id}.mp4')

'''
downloading video
transcribing video
summarzing text
splitting video
stitching video
'''

if __name__ == '__main__':
    app.run()