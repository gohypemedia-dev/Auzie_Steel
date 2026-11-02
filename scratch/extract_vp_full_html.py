import urllib.request, re

req = urllib.request.Request('https://varcopruden.com/', headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as resp:
    html = resp.read().decode('utf-8', errors='ignore')

# 1. Industries Slider HTML
p1 = html.find('cmp-industries-slider')
p2 = html.find('cmp-blockquote-with-image')
p3 = html.find('cmp-footer') or html.find('footer')

print("=== INDUSTRIES SLIDER FULL HTML ===")
print(html[p1-50:p2][:4000])

print("\n=== BLOCKQUOTE FULL HTML ===")
print(html[p2-50:p2+5000])

