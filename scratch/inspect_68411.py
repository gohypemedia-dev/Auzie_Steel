with open("scratch/royal_chunk.js", "r", encoding="utf-8") as f:
    js = f.read()

idx = js.find("68411,")
print("Module 68411:")
print(js[idx:idx+1500])

