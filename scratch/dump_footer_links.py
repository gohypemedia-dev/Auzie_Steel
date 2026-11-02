with open('scratch/varco_lower_section.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re
footer_links_match = re.search(r'(<div class="footer-links">.*?</div>\s*</div>\s*</div>\s*</div>)', text, re.DOTALL)
if footer_links_match:
    print('Found footer links!')
    with open('scratch/varco_footer_links_exact.html', 'w', encoding='utf-8') as out:
        out.write(footer_links_match.group(1))
    print('Saved scratch/varco_footer_links_exact.html')
else:
    print('Could not find footer-links block')

