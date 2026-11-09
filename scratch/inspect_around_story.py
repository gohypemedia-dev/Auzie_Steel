req_html = open("scratch/royal_full_css.css").read() # wait, html was in python script
import urllib.request
import re

req = urllib.request.Request('https://royalrising.vercel.app/', headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req, timeout=15).read().decode('utf-8')

idx = html.find('id="story"')
print("Surrounding HTML around id=story:")
print(html[max(0, idx-400):min(len(html), idx+3000)])

