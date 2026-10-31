import urllib.request, re

with open('scratch/inspect_royal.py', 'r') as f:
    pass

url = 'https://royalrising.vercel.app/_next/static/immutable/chunks/22xpvdrjn_v1h.css'
css = urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})).read().decode('utf-8')

# find .svc rules
idx = css.find('.svc-intro')
if idx != -1:
    print(css[idx:idx+2500])

