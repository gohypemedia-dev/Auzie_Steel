with open("scratch/royal_chunk.js", "r", encoding="utf-8") as f:
    js = f.read()

import re
# find usages of module 58168 or "story"
matches = [m.start() for m in re.finditer(r'id:\s*["\']story["\']', js)]
print("Found matches for id: 'story':", len(matches))
for idx in matches:
    start = max(0, idx - 800)
    end = min(len(js), idx + 1000)
    print("=== SNIPPET ===")
    print(js[start:end])
    print("="*60)

