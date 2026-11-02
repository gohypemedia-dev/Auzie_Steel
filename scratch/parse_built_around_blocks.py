with open('scratch/varco_built_around_full.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re

# Find all blocks of left-right content visual
blocks = re.findall(r'<div class="cmp-left-right-content-visual[^"]*"[^>]*>.*?</div>\s*</div>\s*</div>\s*</div>', text, re.DOTALL)
print('Total left-right visual blocks:', len(blocks))

for i, b in enumerate(blocks):
    h3_m = re.search(r'<h3>(.*?)</h3>', b, re.DOTALL)
    h3 = re.sub(r'<[^>]+>', '', h3_m.group(1)).strip() if h3_m else 'No H3'
    p_m = re.search(r'<p>(.*?)</p>', b, re.DOTALL)
    p = re.sub(r'<[^>]+>', '', p_m.group(1)).strip() if p_m else 'No P'
    btn_m = re.search(r'<a[^>]+class="([^"]+)"[^>]*>(.*?)</a>', b, re.DOTALL)
    btn_cls = btn_m.group(1) if btn_m else ''
    btn_txt = re.sub(r'<[^>]+>', '', btn_m.group(2)).strip() if btn_m else ''
    img_m = re.search(r'data-src-lazy="([^"]+)"[^>]*alt="([^"]*)"', b)
    if not img_m:
        img_m = re.search(r'<img[^>]+src="([^"]+)"[^>]*alt="([^"]*)"', b)
    img_src = img_m.group(1) if img_m else 'No Img'
    img_alt = img_m.group(2) if img_m else 'No Alt'
    classes = re.search(r'class="([^"]+)"', b).group(1)
    
    print(f'\n--- ITEM {i+1} ---')
    print('Classes:', classes)
    print('H3:', h3)
    print('P:', p)
    print('Button:', btn_txt, f'({btn_cls})')
    print('Img:', img_src[:80], 'Alt:', img_alt[:60])

