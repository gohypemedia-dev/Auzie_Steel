import re

with open('scratch/varco_site.css', 'r', encoding='utf-8') as f:
    css = f.read()

def dump_all(selector_keyword, out_name):
    # Match any CSS rule containing selector_keyword
    rules = re.findall(rf'([^{{}}]*?{selector_keyword}[^{{}}]*?\{{[^{{}}]+?\}})', css)
    with open(f'scratch/{out_name}.css', 'w', encoding='utf-8') as f_out:
        for r in rules:
            f_out.write(r + '\n')
    print(f'Wrote {len(rules)} rules to scratch/{out_name}.css')

dump_all('two-columns-cta', 'two_cols_cta')
dump_all('subscribe-form', 'sub_form')
dump_all('footer', 'varco_footer_all')

