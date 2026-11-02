import urllib.request, re

css_url = 'https://varcopruden.com/etc.clientlibs/bluescope-sites/clientlibs/clientlib-site/varcopruden.lc-516d2b87a20828d9051819ac500b0339-lc.min.css'
req = urllib.request.Request(css_url, headers={'User-Agent': 'Mozilla/5.0'})
css = urllib.request.urlopen(req, timeout=15).read().decode('utf-8', errors='ignore')

matches = [m.start() for m in re.finditer(r'fixed-headline', css)]
print(f'Found {len(matches)} matches in CSS')
for m in matches[:10]:
    print('--- CSS MATCH ---')
    print(css[max(0, m-50):m+600])

