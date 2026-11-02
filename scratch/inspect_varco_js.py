import urllib.request, re

js_url = 'https://varcopruden.com/etc.clientlibs/bluescope-sites/clientlibs/clientlib-site/varcopruden.lc-a8508f4f580ab2705f8ac37cce00c710-lc.min.js'
req = urllib.request.Request(js_url, headers={'User-Agent': 'Mozilla/5.0'})
js = urllib.request.urlopen(req, timeout=15).read().decode('utf-8', errors='ignore')

matches = [m.start() for m in re.finditer(r'fixed-headline', js)]
print(f'Found {len(matches)} matches in JS')
for m in matches[:5]:
    print('--- JS MATCH ---')
    print(js[max(0, m-200):m+800])
    print('='*50)

