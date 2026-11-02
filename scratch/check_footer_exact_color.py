with open('scratch/varco_site.css', 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = re.findall(r'(\.footer[^{}]*?\{[^{}]+?\})', text)
for m in matches:
    if 'background' in m:
        print(m)

