with open('scratch/varco_lower_section.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re
sub_match = re.search(r'(<div class="common-section cmp-subscribe-form.*?</form>\s*</div>\s*</div>)', text, re.DOTALL)
if sub_match:
    print('Found subscribe form markup:')
    print(sub_match.group(1)[:2000])
else:
    print('Searching broader subscribe-form')
    idx = text.find('cmp-subscribe-form')
    print(text[idx:idx+3000])

