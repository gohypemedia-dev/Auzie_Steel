import urllib.request, re

url = 'https://varcopruden.com/etc.clientlibs/bluescope-sites/clientlibs/clientlib-site/varcopruden.lc-516d2b87a20828d9051819ac500b0339-lc.min.css'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
css = urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')

with open('scratch/live_varcopruden.css', 'w', encoding='utf-8') as f:
    f.write(css)

print('CSS length:', len(css))

# Find media queries or rules for cmp-subscribe-form__content-right
for m in re.finditer(r'([^{}]*cmp-subscribe-form__content-right[^{}]*)\{([^}]*)\}', css):
    print(m.group(1), '===>', m.group(2))

# Also search for footer-main rules
for m in re.finditer(r'([^{}]*footer-main[^{}]*)\{([^}]*)\}', css):
    print(m.group(1), '===>', m.group(2))

