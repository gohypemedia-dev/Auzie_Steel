import urllib.request, re, json

req = urllib.request.Request('https://varcopruden.com/', headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as resp:
    html = resp.read().decode('utf-8', errors='ignore')

# 1. Extract all industries cards
ind_pos = html.find('Industries at work')
ind_section = html[ind_pos-200:ind_pos+15000]

cards = re.findall(r'<div class="cardlist__card-wrapper.*?</h3>', ind_section, flags=re.DOTALL)
print(f'Total industry cards found: {len(cards)}')
industry_data = []
for c in cards:
    href = re.search(r'href="([^"]+)"', c)
    img = re.search(r'data-src-lazy="([^"]+)"', c) or re.search(r'src="([^"]+)"', c)
    title = re.search(r'<h3[^>]*>(.*?)</h3>', c)
    industry_data.append({
        'title': title.group(1).strip() if title else '',
        'href': href.group(1) if href else '',
        'img': img.group(1) if img else ''
    })

print('Industry Data:')
print(json.dumps(industry_data, indent=2))

# 2. Extract Blockquote / Testimonials
bq_pos = html.find('cmp-blockquote-with-image')
bq_section = html[bq_pos:bq_pos+15000]

quotes = re.findall(r'<h2 class="h4">(.*?)</h2>', bq_section)
authors = re.findall(r'<span class="cmp-blockquote-with-image__quote-author">(.*?)</span>\s*<span class="cmp-blockquote-with-image__quote-position">(.*?)</span>', bq_section)
images = re.findall(r'cmp-blockquote-with-image__image-item.*?data-cmp-filereference="([^"]+)"', bq_section, flags=re.DOTALL)

print('\nQuotes Data:')
print('Quotes:', quotes)
print('Authors:', authors)
print('Images:', images)

