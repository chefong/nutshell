import json
from summarizer import Summarizer
from moviepy.video.io.ffmpeg_tools import ffmpeg_extract_subclip
from pytube import YouTube, extract
from google.cloud import storage
from moviepy.editor import *
from datetime import timedelta
from .readingStats import *
from os import path

BUCKET_NAME = 'nutshell-audio'
THUMBNAIL_DIR = 'thumbnails'

def upload_to_bucket(blob_name, path_to_file):
    storage_client = storage.Client.from_service_account_json(
        'gcp.json')

    bucket = storage_client.get_bucket(BUCKET_NAME)
    blob = bucket.blob(blob_name)
    blob.upload_from_filename(path_to_file)

    return blob.public_url

def upload_thumbnails(video_id):
    i = 0
    storage_client = storage.Client.from_service_account_json(
        'gcp.json')

    bucket = storage_client.get_bucket(BUCKET_NAME)
    urls = []

    while True:
        loc = f'{THUMBNAIL_DIR}/{video_id}_{i}.png'
        if not path.exists(loc):
            break
        blob = bucket.blob(loc)
        blob.upload_from_filename(loc)
        urls.append(blob.public_url)
        i += 1
    return urls

def transcribe_gcs_with_word_time_offsets(filename):
    """Transcribe the given audio file asynchronously and output the word time
    offsets."""
    from google.cloud import speech
    gcs_uri = f'gs://nutshell-audio/{filename}'

    client = speech.SpeechClient()

    audio = speech.RecognitionAudio(uri=gcs_uri)
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.FLAC,
        language_code="en-US",
        enable_word_time_offsets=True,
        model='video',
        audio_channel_count=2,
        enable_automatic_punctuation=True
    )

    operation = client.long_running_recognize(config=config, audio=audio)

    print("Waiting for operation to complete...")
    result = operation.result(timeout=60*10)

    words = []
    for result in result.results:
        alternative = result.alternatives[0]

        for word_info in alternative.words:
            words.append({
                'word': word_info.word,
                'start_time': word_info.start_time / timedelta(milliseconds=1),
                'end_time': word_info.end_time / timedelta(milliseconds=1)
            })
    return words

def merge_intervals(ints, thresh=1):
    out = []
    for interval in ints:
        if len(out) > 0 and interval[0] - out[-1][1] < thresh:
            old_st = out[-1][0]
            out.pop()
            out.append((old_st, interval[1]))
        else:
            out.append(interval)
    return out

def words2sents(words):
    doc = ''
    curr_sent = ''
    sents = []
    curr_start = None
    cnt = 0
    for val in words:
        word = val['word']
        if word[-1] in '!.?':
            if curr_start is None:
                print('WARNING: unknown start time!')
            curr_sent += word
            sents.append((curr_sent, curr_start, val['end_time']/1000))
            curr_sent = ''
        else:
            if not curr_sent:
                curr_start = val['start_time']/1000
            curr_sent += word + ' '
        cnt += 1
        doc += word + ' '
    # if curr_sent:
    #     sents.append(curr_sent[:-1])
    return doc, sents

def summarize(doc, sents, ratio=0.5):
    model = Summarizer()
    summary = model(doc, ratio=ratio)
    print(doc)
    # print(cnt)

    used_sents = []
    intervals = []
    for sent, st, end in sents:
        if sent in summary:
            intervals.append((st, end))
            used_sents.append(sent)
    print(intervals)
    adj_intervals = merge_intervals(intervals)
    return adj_intervals, intervals, summary, used_sents

def make_video(video_id, in_filename, intervals, raw_intervals, out_filename):
    clip = VideoFileClip(in_filename)
    clips = []
    thumbnails = []

    for i in range(len(intervals)):
        st, end = intervals[i]
        # center = (end - st) / 2 + st
        clips.append(clip.subclip(st, end))

    for i in range(len(raw_intervals)):
        st, end = raw_intervals[i]
        thumb_path = f'{THUMBNAIL_DIR}/{video_id}_{i}.png'
        clip.save_frame(thumb_path, st)
        thumbnails.append(thumb_path)

    final = concatenate_videoclips(clips)
    try:
        final.write_videofile(out_filename, threads=2, logger=None)
        print("Saved .mp4 without Exception at {}".format(out_filename))
    except IndexError:
        # Short by one frame, so get rid on the last frame:
        final = final.subclip(t_end=(clip.duration - 1.0/final.fps))
        final.write_videofile(out_filename, threads=2, logger=None)
        print("Saved .mp4 after Exception at {}".format(out_filename))
    return thumbnails

def get_stats(doc, summary, sents, short_int):
    levels, xAxis = levelForMin(sents)
    read_time_original = readTime(doc)
    read_time_short = readTime(summary)
    read_time_diff = (read_time_short - read_time_original) / read_time_original * 100
    # total time of videos
    total_short = sum(x[1] - x[0] for x in short_int)
    total_orig = sum(x[2] - x[1] for x in sents)
    per_diff = (total_short - total_orig) / total_orig * 100

    return json.dumps({
        'readingLevels': levels,
        'readTimeOriginal': read_time_original,
        'readTimeShort': read_time_short,
        'readTimePercentDiff': read_time_diff,
        'xAxisLabels': xAxis,
        'shortenedLength': total_short,
        'percentShortened': per_diff
    })

def make_sections(sents, summary):
    out = []
    key_sent = 'Introduction'
    curr = []
    for sent in sents:
        if sent[0] in summary:
            if key_sent == 'Introduction' and not curr:
                key_sent = sent[0]
                continue

            out.append({
                'keySentence': key_sent,
                'sentences': ' '.join(curr)
            })
            curr = []
            key_sent = sent[0]
        else:
            curr.append(sent[0])
    if curr:
        out.append({
            'keySentence': 'Conclusion',
            'sentences': ' '.join(curr)
        })
    return json.dumps(out)


def process_video(url, conn, cb=lambda:None, ratio=0.5):
    vid_id = extract.video_id(url)
    cb(vid_id, 'downloading')

    video = YouTube(url)
    filename = f'{vid_id}'
    video.streams.filter(file_extension='mp4')[0] \
        .download('./videos/', filename=filename)

    video_path = f'videos/{filename}.mp4'
    output_path = f'videos/out_{filename}.mp4'
    audio_path = f'videos/{filename}.flac'

    cb(vid_id, 'demuxing')
    clip = VideoFileClip(video_path)
    clip.audio.write_audiofile(audio_path, codec='flac')
    bucket_audio = f'audio/{filename}.flac'

    cb(vid_id, 'uploading')
    upload_to_bucket(bucket_audio, audio_path)
    cb(vid_id, 'transcribing')
    words = transcribe_gcs_with_word_time_offsets(bucket_audio)
    doc, sents = words2sents(words)
    cb(vid_id, 'summarizing')
    intervals, raw_intervals, summary, used_sents = summarize(doc, sents, ratio=ratio)
    cb(vid_id, 'stitching')

    thumbnails = make_video(vid_id, video_path, intervals, raw_intervals, output_path)
    print('Final upload to GCP')
    pub_url = upload_to_bucket(f'videos/{vid_id}.mp4', output_path)
    print('Uploading thumbnails to GCP...')
    thumbnail_urls = upload_thumbnails(vid_id)

    print('HMMMMMMMM: ', len(used_sents), len(raw_intervals), len(thumbnails))
    super_sents = []
    curr_total = 0
    for i in range(len(raw_intervals)):
        st, end = raw_intervals[i]
        diff = (end - st)
        super_sents.append([used_sents[i], curr_total, curr_total + diff, thumbnail_urls[i]])
        curr_total += diff
    cur = conn.cursor()
    cur.execute("UPDATE nutstash.nutstash SET transcript=%s, timeandsentence=%s, stats=%s, sections=%s, shortenedlink=%s WHERE vid_id = %s",
        (doc, json.dumps(super_sents), get_stats(doc, summary, sents, intervals), make_sections(sents, summary), pub_url, vid_id))
    conn.commit()

'''
downloading video
transcribing video
summarizing text
splitting video
stitching video
'''