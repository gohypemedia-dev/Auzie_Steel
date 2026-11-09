import urllib.request
import re

url = "https://royalrising.vercel.app/_next/static/immutable/chunks/42vt-dn8rt-9h.css"
css = urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})).read().decode('utf-8')

with open("scratch/royal_full_css.css", "w", encoding="utf-8") as f:
    f.write(css)

req = urllib.request.Request('https://royalrising.vercel.app/', headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req, timeout=15).read().decode('utf-8')

m = re.search(r'(<section[^>]*id=["\']story["\'][^>]*>.*?</section>)', html, re.DOTALL)
if m:
    with open("scratch/story_html.html", "w", encoding="utf-8") as f:
        f.write(m.group(1))
    print("Story section written successfully!")
