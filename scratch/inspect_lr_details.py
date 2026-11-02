with open('scratch/varco_site.css', 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = re.findall(r'([^{}]*?cmp-left-right-content-visual[^{}]*?\{[^{}]+?\})', text)
for m in matches:
    if any(k in m for k in ['background', 'color', 'layout-version-2', 'h3', 'font', 'btn--black-outline']):
        print(m[:200])

