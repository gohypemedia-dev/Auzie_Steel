import urllib.request, re

req = urllib.request.Request('https://royalrising.vercel.app/', headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req, timeout=10).read().decode('utf-8', errors='ignore')

scripts = re.findall(r'src="([^"]+\.js[^"]*)"', html)
print('Found scripts count:', len(scripts))
for s in scripts:
    print(s)

