import urllib.request

req = urllib.request.Request('https://royalrising.vercel.app/', headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req, timeout=15).read().decode('utf-8')

idx = html.find('id="story"')
with open("scratch/around_story.html", "w", encoding="utf-8") as f:
    f.write(html[max(0, idx-500):min(len(html), idx+4000)])
print("Written successfully!")

