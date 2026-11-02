import re

with open('scratch/varco_full.html', 'r', encoding='utf-8') as f:
    text = f.read()

root_classes = re.findall(r'root-container[^\s"\'<>]*', text)
print('Root container classes:', set(root_classes))

exp_match = re.search(r'cmp-experiencefragment--footer.*?<div[^>]*class="([^"]+)"', text, re.DOTALL)
if exp_match:
    print('Container around footer:', exp_match.group(1))

# Check background of .footer
footer_main_rules = re.findall(r'([^{}]*?\.footer-main[^{}]*?\{[^{}]+?\})', open('scratch/varco_site.css', encoding='utf-8').read())
for r in footer_main_rules:
    print('Rule:', r)

