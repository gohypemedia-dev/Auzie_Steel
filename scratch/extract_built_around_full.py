with open('scratch/varco_full.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re
start_idx = text.find('Built around what your project needs')
end_idx = text.find('Let&#39;s\n\nconnect', start_idx)
if end_idx == -1:
    end_idx = text.find('Let&#39;s', start_idx)

print('Start:', start_idx, 'End:', end_idx)
with open('scratch/varco_built_around_full.html', 'w', encoding='utf-8') as out:
    out.write(text[start_idx-200:end_idx])

print('Saved scratch/varco_built_around_full.html, size:', end_idx - (start_idx - 200))

