with open('scratch/varco_built_around_full.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re
print("Top 1000 chars of built around:")
print(text[:1000])

