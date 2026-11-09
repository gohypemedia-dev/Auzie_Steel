import urllib.request
import re

req = urllib.request.Request('https://royalrising.vercel.app/', headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req, timeout=15).read().decode('utf-8')

# Find the section in html with id="story"
story_match = re.search(r'<section[^>]*id=["\']story["\'][^>]*>.*?</section>', html, re.DOTALL)
if story_match:
    print("=== STORY HTML ===")
    print(story_match.group(0)[:1500])
else:
    print("Story section not found in raw html (might be client side rendered). Let's check for any mention of story:")
    for m in re.finditer(r'id=["\']story["\']|Brand Story|Every curve', html):
        print(html[max(0, m.start()-100):min(len(html), m.end()+200)])

css_links = re.findall(r'href="([^"]+\.css[^"]*)"', html)
for l in css_links:
    url = 'https://royalrising.vercel.app' + l if l.startswith('/') else l
    css = urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})).read().decode('utf-8')
    rules = re.findall(r'(\.[^{]+split[^{]*\{[^}]+\})', css)
    if rules:
        print(f"=== CSS RULES from {l} ===")
        for r in rules[:30]:
            print(r)

