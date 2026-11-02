with open('scratch/varco_site.css', 'r', encoding='utf-8') as f:
    text = f.read()

import re
print("Background of two-columns-content:")
for m in re.finditer(r'two-columns-content[^{}]*?\{([^{}]+?)\}', text):
    if 'background' in m.group(1):
        print(m.group(0)[:150])

print("\nBackground of layout-version-2:")
for m in re.finditer(r'layout-version-2[^{}]*?\{([^{}]+?)\}', text):
    if 'background' in m.group(1):
        print(m.group(0)[:150])

