import urllib.request
import re

url = "https://royalrising.vercel.app/_next/static/immutable/chunks/0u1o0ac-b0brd.js"
js = urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})).read().decode('utf-8')

with open("scratch/royal_chunk.js", "w", encoding="utf-8") as f:
    f.write(js)

matches = [m.start() for m in re.finditer(r'split__media', js)]
print("Found matches for split__media:", len(matches))
for idx in matches:
    start = max(0, idx - 1000)
    end = min(len(js), idx + 1500)
    print("=== SNIPPET ===")
    print(js[start:end])
    print("="*60)

