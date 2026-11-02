with open('scratch/varco_full.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re
scene7_imgs = re.findall(r'https://s7ap1\.scene7\.com/is/image/bluescopesteel/[^\'"\s?]+', text)
for u in sorted(set(scene7_imgs)):
    print(u)

