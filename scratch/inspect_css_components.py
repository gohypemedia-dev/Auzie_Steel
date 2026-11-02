with open('scratch/live_varcopruden.css', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re

print("=== INDUSTRIES SLIDER CSS ===")
for m in re.finditer(r'(\.cmp-industries-slider[^{]*\{[^}]+\})', text):
    print(m.group(1)[:250])

print("\n=== BLOCKQUOTE WITH IMAGE CSS ===")
for m in re.finditer(r'(\.cmp-blockquote-with-image[^{]*\{[^}]+\})', text):
    print(m.group(1)[:250])

