with open("scratch/around_story.html", "r", encoding="utf-8") as f:
    html = f.read()

idx = html.find('id="approach"')
print(html[idx:idx+2500])

