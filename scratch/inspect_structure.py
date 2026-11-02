import re

with open('scratch/inspect_varco.py', 'r') as f:
    pass

with open('scratch/varco_slider.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Let's inspect the exact HTML structure of the container
idx = html.find('cmp-fixed-headline-slider__container')
print(html[idx-100:idx+2500])

