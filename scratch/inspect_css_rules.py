with open("scratch/royal_full_css.css", "r", encoding="utf-8") as f:
    css = f.read()

# Let's extract all CSS rules matching .split
import re
for m in re.finditer(r'([^{}]*\{[^{}]*\})', css):
    rule = m.group(1)
    if any(k in rule for k in ['split', 'story-stack', 'story', '.pill']):
        print(rule.strip())
        print('-'*40)

