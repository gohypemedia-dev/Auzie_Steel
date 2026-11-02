import urllib.request, re

css_url = 'https://varcopruden.com/etc.clientlibs/bluescope-sites/clientlibs/clientlib-site/varcopruden.lc-516d2b87a20828d9051819ac500b0339-lc.min.css'
req = urllib.request.Request(css_url, headers={'User-Agent': 'Mozilla/5.0'})
css = urllib.request.urlopen(req, timeout=15).read().decode('utf-8', errors='ignore')

# find all rules starting with .cmp-fixed-headline
matches = re.findall(r'(\.cmp-fixed-headline[^{]+)\{([^}]+)\}', css)
print(f'Total matched CSS rules: {len(matches)}')
with open('scratch/varco_extracted_rules.css', 'w', encoding='utf-8') as f:
    for sel, body in matches:
        f.write(f'{sel} {{\n  {body}\n}}\n\n')
print('Wrote scratch/varco_extracted_rules.css')

