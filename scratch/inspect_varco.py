import urllib.request, re

url = 'https://varcopruden.com/'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
html = urllib.request.urlopen(req, timeout=15).read().decode('utf-8', errors='ignore')

idx = html.find('cmp-fixed-headline-slider')
end_idx = html.find('</section>', idx)
if end_idx == -1: end_idx = html.find('</div>\n</div>\n</div>', idx + 1000)

print('Slider HTML snippet:')
with open('scratch/varco_slider.html', 'w', encoding='utf-8') as f:
    f.write(html[idx-100:idx+15000])
print('Wrote scratch/varco_slider.html')

# Find CSS files
css_files = re.findall(r'href="([^"]+\.css[^"]*)"', html)
print('CSS files:', css_files)

# Find JS files
js_files = re.findall(r'src="([^"]+\.js[^"]*)"', html)
print('JS files:', js_files)

