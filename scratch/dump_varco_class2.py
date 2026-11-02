import urllib.request

js_url = 'https://varcopruden.com/etc.clientlibs/bluescope-sites/clientlibs/clientlib-site/varcopruden.lc-a8508f4f580ab2705f8ac37cce00c710-lc.min.js'
req = urllib.request.Request(js_url, headers={'User-Agent': 'Mozilla/5.0'})
js = urllib.request.urlopen(req, timeout=15).read().decode('utf-8', errors='ignore')

idx = js.find('class pe{')
with open('scratch/varco_pe_class_part2.js', 'w', encoding='utf-8') as f:
    f.write(js[idx+4000:idx+12000])
print('Wrote part 2')

