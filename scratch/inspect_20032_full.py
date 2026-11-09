with open("scratch/royal_chunk.js", "r", encoding="utf-8") as f:
    js = f.read()

idx = js.find("20032,e=>")
with open("scratch/mod_20032_full.txt", "w", encoding="utf-8") as f:
    f.write(js[idx:idx+6000])

print("Saved mod_20032_full.txt")

