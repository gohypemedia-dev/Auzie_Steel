with open('scratch/varco_site.css', 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = re.findall(r'([^{}]*?two-columns-content[^{}]*?\{[^{}]+?\})', text)
for m in matches:
    print(m[:200])

