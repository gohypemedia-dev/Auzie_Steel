with open("scratch/royal_chunk.js", "r", encoding="utf-8") as f:
    js = f.read()

idx = js.find("lerp:.085")
print(js[max(0, idx-400):min(len(js), idx+1000)])

