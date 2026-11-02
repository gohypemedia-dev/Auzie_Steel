with open('scratch/varco_built_around_section.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = re.findall(r'(https://s7ap1\.scene7\.com/is/image/bluescopesteel/[^"&?]+)', text)
print('Matches:', set(matches))

imgs = re.findall(r'data-src="([^"]+)"', text)
print('Data-src:', set(imgs))

