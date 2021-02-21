from pytube import YouTube
from tqdm import tqdm
import psycopg2

con = psycopg2.connect(database="postgres", user="postgres", password="almond", host="34.94.74.255", port="5432")

print("Database opened successfully", flush=True)
cur = con.cursor()
cur.execute("SELECT videolink, percent, starttime, endtime, vid_id FROM nutstash.nutstash WHERE starttime > 0 AND endtime > 0")
rows = cur.fetchall()

f = open('data.csv', 'w')
f.write('length,percent,duration\n')

lookup = {}
for row in tqdm(rows):
    vid_id = rows[4]
    if vid_id in lookup:
        dur = lookup[vid_id]
    else:
        vid = YouTube(row[0])
        dur = vid.length
        lookup[vid_id] = dur
    print(row[0])
    f.write(','.join([str(dur), str(row[1]), str(row[3] - row[2])]) + '\n')

f.close()
