import urllib.request, re

req = urllib.request.Request('https://royalrising.vercel.app/', headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req, timeout=15).read().decode('utf-8', errors='ignore')

# find all script src
scripts = re.findall(r'src="([^"]+\.js[^"]*)"', html)
print('Scripts:', scripts)

for s in scripts:
    full_url = 'https://royalrising.vercel.app' + s if s.startswith('/') else s
    try:
        js = urllib.request.urlopen(urllib.request.Request(full_url, headers={'User-Agent': 'Mozilla/5.0'})).read().decode('utf-8')
        if 'svc__track' in js or 'svc-intro' in js or 'svc__view' in js or 'Working across disciplines' in js:
            print(f'FOUND IN {s}! Length: {len(js)}')
            idx = js.find('svc__track')
            if idx == -1: idx = js.find('svc-intro')
            print(js[max(0, idx-300):idx+1200])
    except Exception as e:
        print('Error fetching script:', e)

