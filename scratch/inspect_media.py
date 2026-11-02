import re

with open('scratch/live_varcopruden.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Let's search for media queries containing cmp-subscribe-form
queries = re.findall(r'@media[^{]*\{([^{}]*\{[^{}]*\})+[^{}]*\}', css)
print('Media queries found')

for m in re.finditer(r'@media\s*([^{]+)\{([^@]*?\.cmp-subscribe-form[^@]*?)\}', css):
    q = m.group(1).strip()
    b = m.group(2).strip()
    print('MEDIA:', q)
    for rule in re.finditer(r'([^{}]+)\{([^}]+)\}', b):
        sel = rule.group(1).strip()
        body = rule.group(2).strip()
        if 'subscribe' in sel or 'footer' in sel:
            print('  ', sel, '===>', body)

