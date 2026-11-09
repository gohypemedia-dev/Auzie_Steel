import re

with open("scratch/0u1o0ac-b0brd.js", "r", encoding="utf-8", errors="ignore") as f:
    js = f.read()

# find module defining split
matches = [m.start() for m in re.finditer(r'className:\s*["\']split["\']', js)]
print("Found matches for className: 'split':", len(matches))
for idx in matches:
    start = max(0, idx - 1200)
    end = min(len(js), idx + 1500)
    print("=== SNIPPET ===")
    print(js[start:end])
    print("="*60)

