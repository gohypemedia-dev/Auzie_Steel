with open("scratch/royal_full_css.css", "r", encoding="utf-8") as f:
    css = f.read()

import re
matches = re.finditer(r'@media[^{]+\{(?:[^{}]*\{[^{}]*\})*?[^{}]*\}', css)
for m in matches:
    block = m.group(0)
    if "split" in block:
        header = block[:block.find('{')+1]
        print("MEDIA:", header)
        for r in re.finditer(r'([^{}]*\{[^{}]*\})', block):
            if "split" in r.group(1):
                print("  ", r.group(1).strip())
