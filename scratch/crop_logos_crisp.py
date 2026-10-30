from PIL import Image

img = Image.open(r"C:\Users\HP\.gemini\antigravity\brain\53a8b605-43fe-4527-b84c-8bb907b8b6bc\.user_uploaded\media_1793356231602_3cbf7641.png")

# Crop pure white cells with intact original subpixel antialiasing
# y: 31 to 97 (height = 66px)
# x boundaries of the 6 columns:
cols = [
    ("bluescope", 0, 161),
    ("truecore", 162, 334),
    ("iccons", 335, 507),
    ("orrcon-steel", 508, 680),
    ("framecad", 681, 852),
    ("surdex", 853, 1000),
]

for name, x1, x2 in cols:
    cell = img.crop((x1, 31, x2, 97))
    # Resize with high-quality Lanczos upsampling (2x) so it displays razor sharp on Retina/High-DPI screens!
    w, h = cell.size
    cell_2x = cell.resize((w * 2, h * 2), Image.Resampling.LANCZOS)
    out_path = rf"public\partners\{name}-clean.png"
    cell_2x.save(out_path)
    print(f"Saved {out_path} ({cell_2x.size})")

