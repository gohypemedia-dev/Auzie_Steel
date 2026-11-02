with open('scratch/varco_site.css', 'r', encoding='utf-8') as f:
    text = f.read()

import re

def dump_rules(keyword):
    matches = re.findall(rf'([^{{}}]*?{keyword}[^{{}}]*?\{{[^{{}}]+?\}})', text)
    print(f'=== Rules for {keyword} ({len(matches)}) ===')
    for m in matches[:25]:
        print(m[:180])

dump_rules('left-right-content-visual')

