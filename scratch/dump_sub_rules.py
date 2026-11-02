with open('scratch/live_varcopruden.css', 'r', encoding='utf-8') as f:
    css = f.read()

import re
matches = re.findall(r'(\.cmp-subscribe-form[^{}]*\{[^}]+\})', css)
for m in matches:
    print(m)

