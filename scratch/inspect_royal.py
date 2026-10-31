import urllib.request, re, sys

req = urllib.request.Request('https://royalrising.vercel.app/', headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req, timeout=15).read().decode('utf-8', errors='ignore')

# find css files linked
css_links = re.findall(r'href="([^"]+\.css[^"]*)"', html)
print('CSS links:', css_links)

for link in css_links:
    full_url = 'https://royalrising.vercel.app' + link if link.startswith('/') else link
    try:
        css = urllib.request.urlopen(urllib.request.Request(full_url, headers={'User-Agent': 'Mozilla/5.0'})).read().decode('utf-8')
        print(f'Downloaded {link}: {len(css)} chars')
        matches = [m.start() for m in re.finditer(r'\.svc', css)]
        for m in matches[:10]:
            print('--- CSS SNIPPET ---')
            print(css[max(0, m-20):m+400])
    except Exception as e:
        print('Error:', e)

