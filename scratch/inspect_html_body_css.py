with open("scratch/royal_full_css.css", "r", encoding="utf-8") as f:
    css = f.read()

import re
matches = re.finditer(r'(html[^{]*\{[^}]+\})', css)
for m in matches:
    print(m.group(0))

matches2 = re.finditer(r'(body[^{]*\{[^}]+\})', css)
for m in matches2:
    print(m.group(0))

