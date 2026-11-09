with open("scratch/royal_chunk.js", "r", encoding="utf-8") as f:
    js = f.read()

# Module 58168
idx = js.find("58168,e=>")
snippet = js[idx:idx+4500]

with open("scratch/split_component_raw.js", "w", encoding="utf-8") as f:
    f.write(snippet)

print("Saved module 58168 cleanly!")

