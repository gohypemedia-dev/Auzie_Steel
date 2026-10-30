from PIL import Image
import numpy as np

img = Image.open(r"C:\Users\HP\.gemini\antigravity\brain\53a8b605-43fe-4527-b84c-8bb907b8b6bc\.user_uploaded\media_1793356231602_3cbf7641.png")
arr = np.array(img)

# Let's find vertical divider lines
for x in range(1, 1023):
    col = arr[35:95, x, :3]
    # Check if a single column is consistently darker than background (vertical line)
    # Background is (253, 254, 255)
    if col[:, 0].mean() < 245 and col[:, 1].std() < 5 and (col[:, 0] < 240).all():
        print(f"Vertical line at x={x}")

# Let's crop the strip directly from y=31 to y=98 (or whatever height gives nice padding)
# Crop the strip:
strip = img.crop((0, 31, 1024, 98))
strip.save(r"public\partner-logos-strip.png")
print("Saved partner-logos-strip.png with size:", strip.size)
