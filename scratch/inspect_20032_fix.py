with open("scratch/royal_chunk.js", "r", encoding="utf-8") as f:
    js = f.read()

idx = js.find("20032")
with open("scratch/mod_20032.txt", "w", encoding="utf-8") as f:
    f.write(js[max(0, idx-500):min(len(js), idx+3500)])
print("Saved mod_20032.txt")

