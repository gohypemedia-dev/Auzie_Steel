with open("scratch/royal_full_css.css", "r", encoding="utf-8") as f:
    css = f.read()

import re
root_m = re.search(r':root\s*\{[^}]+\}', css)
if root_m:
    print(root_m.group(0))
else:
    for m in re.finditer(r'--bg:[^;]+;', css):
        print(m.group(0))
    for m in re.finditer(r'--accent:[^;]+;', css):
        print(m.group(0))
    for m in re.finditer(r'--text:[^;]+;', css):
        print(m.group(0))

