import re, urllib.request

with open('scratch/varco_full.html', 'r', encoding='utf-8') as f:
    text = f.read()

css_links = re.findall(r'<link[^>]+href=[\'"]([^\'"]+\.css[^\'"]*)[\'"]', text, re.IGNORECASE)
print('CSS links:', css_links)

