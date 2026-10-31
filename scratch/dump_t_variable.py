import urllib.request

url = 'https://royalrising.vercel.app/_next/static/immutable/chunks/2bcxdaau0l-kr.js'
data = urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'}), timeout=10).read().decode('utf-8', errors='ignore')

idx = data.find('y none none reverse')
print(data[max(0, idx-500):idx+300])

