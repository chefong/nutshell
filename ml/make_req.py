import requests
import json

urls = []
with open('urls.txt', 'r') as f:
    for url in f:
        urls.append(url.strip())

f = open('prog.txt', 'w')

for curr_url in urls:
    print('Working on: ', curr_url)
    r = requests.post('http://localhost:2020/submit', json ={
        'videoLink': curr_url,
        'videoPercentage': 50
    })
    result = r.json()
    print('res: ', result)

    r2 = requests.get(f'http://localhost:2020/process/{result["videoId"]}/50')
    print('res: ', r2.json())
    f.write(result['videoId'] + '\n')

f.close()
