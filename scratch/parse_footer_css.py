import re

with open('scratch/varco_site.css', 'r', encoding='utf-8') as f:
    css = f.read()

def find_rules(pattern):
    matches = re.findall(rf'([^{{}}]*{pattern}[^{{}}]*\{{[^{{}}]*\}})', css)
    return matches

print("--- Two Columns CTA Rules ---")
for r in find_rules(r'two-columns-cta')[:10]:
    print(r[:200])

print("\n--- Subscribe Form Rules ---")
for r in find_rules(r'subscribe-form')[:10]:
    print(r[:200])

print("\n--- Footer Rules ---")
for r in find_rules(r'\.footer')[:15]:
    print(r[:200])

