import urllib.request

scripts = [
    '/_next/static/immutable/chunks/2w2863j34t2xk.js',
    '/_next/static/immutable/chunks/15gnl6daqw8sp.js',
    '/_next/static/immutable/chunks/turbopack-1cvbnb3nlabgn.js',
    '/_next/static/immutable/chunks/00z4pmesk2f4f.js',
    '/_next/static/immutable/chunks/2bcxdaau0l-kr.js',
    '/_next/static/immutable/chunks/0c0hxoamwjsbw.js',
    '/_next/static/immutable/chunks/0uewqbixbc-vj.js'
]

for s in scripts:
    url = 'https://royalrising.vercel.app' + s
    data = urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'}), timeout=10).read().decode('utf-8', errors='ignore')
    if 'svc__track' in data or 'svc__view' in data:
        print(f'MATCH in {s}:')
        idx = data.find('svc__track')
        if idx == -1: idx = data.find('svc__view')
        print(data[max(0, idx-200):idx+800])
        print('='*50)

