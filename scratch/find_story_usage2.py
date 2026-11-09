with open("scratch/royal_chunk.js", "r", encoding="utf-8") as f:
    js = f.read()

import re
matches = [m.start() for m in re.finditer(r'Brand Story', js)]
print("Found matches for Brand Story:", len(matches))
for idx in matches:
    start = max(0, idx - 400)
    end = min(len(js), idx + 800)
    print("=== SNIPPET ===")
    print(js[start:end])
    print("="*60)

