import urllib.request
import re

req = urllib.request.Request('https://royalrising.vercel.app/', headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req, timeout=15).read().decode('utf-8')

scripts = re.findall(r'src="([^"]+\.js[^"]*)"', html)
for s in scripts:
    url = 'https://royalrising.vercel.app' + s if s.startswith('/') else s
    try:
        js = urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})).read().decode('utf-8')
        if '58168' in js:
            print(f"58168 referenced in: {s}")
            for m in re.finditer(r'58168', js):
                print(js[max(0, m.start()-100):min(len(js), m.end()+200)])
    except Exception as e:
        pass

