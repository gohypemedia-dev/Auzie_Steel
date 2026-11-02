with open('scratch/varco_slider.html', 'r', encoding='utf-8') as f:
    html = f.read()

idx = html.find('images-wrapper')
if idx != -1:
    print('Found images-wrapper at', idx)
    print(html[idx-100:idx+2000])
else:
    print('images-wrapper not found, searching images-inner')
    idx2 = html.find('images-inner')
    if idx2 != -1:
        print('Found images-inner at', idx2)
        print(html[idx2-100:idx2+2000])
    else:
        print('Not found')

