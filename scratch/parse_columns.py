with open('scratch/varco_footer_links_exact.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re

columns = re.findall(r'<div class="footer-column[^"]*">(.*?)</div>\s*(?=<div class="footer-column|$)', text, re.DOTALL)
print(f'Total columns: {len(columns)}')
for i, col in enumerate(columns):
    title_m = re.search(r'class="footer-column-title[^"]*"[^>]*>(.*?)</a>|class="footer-column-title[^"]*"[^>]*>(.*?)</span>', col, re.DOTALL)
    title = ""
    if title_m:
        raw_t = title_m.group(1) or title_m.group(2)
        title = re.sub(r'<[^>]+>', '', raw_t).strip()
    
    links = re.findall(r'<a href="([^"]+)"[^>]*>(.*?)</a>', col, re.DOTALL)
    clean_links = [(href, re.sub(r'<[^>]+>', '', t).strip()) for href, t in links if t.strip() != title]
    print(f'Column {i+1}: {title} ({len(clean_links)} links)')
    for h, t in clean_links:
        print(f'   - {t} -> {h}')

