import re

with open('scratch/varco_extracted_rules.css', 'r') as f:
    css = f.read()

for m in re.finditer(r'([^{]+:(?:before|after)[^{]*)\{([^}]+)\}', css):
    print(m.group(1).strip())
    print(m.group(2).strip())
    print('='*50)

