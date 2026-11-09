with open("scratch/royal_chunk.js", "r", encoding="utf-8") as f:
    js = f.read()

idx = js.find("20032")
print("Module 20032 and surrounding code:")
print(js[max(0, idx-500):min(len(js), idx+2500)])

