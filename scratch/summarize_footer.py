with open('scratch/varco_footer_all.css', 'r', encoding='utf-8') as f:
    text = f.read()

with open('scratch/varco_footer_summary.txt', 'w', encoding='utf-8') as out:
    for r in text.split('\n'):
        if any(k in r for k in ['footer-main', 'footer-links', 'footer-column', 'footer-bottom', 'footer-logo', 'legal-links', 'social', 'background-color', 'font-', 'display', 'grid', 'color', 'padding', 'gap', 'margin']):
            out.write(r + '\n')

print('Wrote scratch/varco_footer_summary.txt')

