import urllib.request, re

url = 'https://royalrising.vercel.app/_next/static/immutable/chunks/22xpvdrjn_v1h.css'
css = urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})).read().decode('utf-8')

for m in re.finditer(r'@media[^{]+\{([^{}]*\{[^{}]*\})*\}', css):
    chunk = m.group(0)
    if '.svc' in chunk:
        print('MEDIA QUERY:')
        print(chunk[:1000])
        print('='*50)

