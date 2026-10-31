import urllib.request

url = 'https://royalrising.vercel.app/_next/static/immutable/chunks/2bcxdaau0l-kr.js'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
resp = urllib.request.urlopen(req, timeout=30)
data = resp.read().decode('utf-8', errors='ignore')

idx = data.find('svc__track')
print('Found at', idx)
snippet = data[max(0, idx-600):idx+1600]
with open('scratch/svc_extracted.txt', 'w', encoding='utf-8') as f:
    f.write(snippet)
print('Wrote to scratch/svc_extracted.txt')

