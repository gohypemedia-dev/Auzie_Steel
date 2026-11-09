with open("scratch/royal_chunk.js", "r", encoding="utf-8") as f:
    js = f.read()

import re
matches = [m.start() for m in re.finditer(r'58168', js)]
for idx in matches:
    print("Match at", idx)
    print(js[max(0, idx-500):min(len(js), idx+500)])
    print("="*60)

