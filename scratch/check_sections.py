with open("scratch/around_story.html", "r", encoding="utf-8") as f:
    html = f.read()

import re
sections = re.findall(r'<section[^>]*id=["\']([^"\']+)["\'][^>]*class=["\']([^"\']+)["\']', html)
print("Sections found:", sections)

