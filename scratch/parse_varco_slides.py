import re

with open('scratch/varco_slider.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Let's find headline
headline = re.findall(r'<div class="cmp-fixed-headline-slider__headline">.*?</div>', html, re.DOTALL)
print('HEADLINE SECTION:', headline[0] if headline else 'None')

# Let's find all slide items
item_starts = [m.start() for m in re.finditer(r'<div class="cmp-fixed-headline-item', html)]
print('Item starts:', len(item_starts))

for i, start in enumerate(item_starts):
    end = item_starts[i+1] if i+1 < len(item_starts) else len(html)
    chunk = html[start:end]
    print(f'=== SLIDE {i+1} ===')
    h2 = re.findall(r'<h2>(.*?)</h2>', chunk, re.DOTALL)
    print('Title:', h2)
    p = re.findall(r'<p>(.*?)</p>', chunk, re.DOTALL)
    print('Para:', p)
    img = re.findall(r'data-src="([^"]+)"', chunk)
    print('Image:', img)
