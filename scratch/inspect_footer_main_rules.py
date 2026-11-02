with open('scratch/varco_site.css', 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = [m.start() for m in re.finditer(r'footer-main', text)]
print('footer-main occurrences in CSS:', len(matches))
for idx in matches:
    start = max(0, idx - 50)
    end = min(len(text), idx + 200)
    print('---')
    print(text[start:end])

