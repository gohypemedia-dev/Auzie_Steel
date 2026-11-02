import urllib.request, re

req = urllib.request.Request('https://varcopruden.com/', headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')

css_files = re.findall(r'href="([^"]+\.css[^"]*)"', html)
print('Found CSS files:', len(css_files))
for c in css_files:
    print(c)

