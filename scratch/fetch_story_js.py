import urllib.request
import re

req = urllib.request.Request('https://royalrising.vercel.app/', headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req, timeout=15).read().decode('utf-8')

# Find all script src
scripts = re.findall(r'src="([^"]+\.js[^"]*)"', html)
for s in scripts:
    url = 'https://royalrising.vercel.app' + s if s.startswith('/') else s
    try:
        js = urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})).read().decode('utf-8')
        if 'Brand Story' in js or 'Every curve' in js or 'story-interior' in js:
            print(f"FOUND IN: {s} (length: {len(js)})")
            # find surrounding code
            idx = js.find('Brand Story')
            start = max(0, idx - 1500)
            end = min(len(js), idx + 2500)
            with open("scratch/royal_story_code.js", "w", encoding="utf-8") as out_f:
                out_f.write(js[start:end])
            print("Wrote snippet to scratch/royal_story_code.js")
    except Exception as e:
        print(f"Error fetching {s}: {e}")

