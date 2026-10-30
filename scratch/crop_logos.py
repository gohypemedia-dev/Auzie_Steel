import os
from PIL import Image
import numpy as np

img = Image.open(r"C:\Users\HP\.gemini\antigravity\brain\53a8b605-43fe-4527-b84c-8bb907b8b6bc\.user_uploaded\media_1793356231602_3cbf7641.png")

# Create output dir
os.makedirs(r"public\partners", exist_ok=True)

# Columns definitions (left, top, right, bottom)
# y range where logos sit: 33 to 95
y1, y2 = 33, 95

cols = [
    ("bluescope", 0, 160),
    ("truecore", 162, 333),
    ("iccons", 335, 506),
    ("orrcon-steel", 508, 679),
    ("framecad", 681, 851),
    ("surdex", 853, 998),
]

for name, x1, x2 in cols:
    cropped = img.crop((x1, y1, x2, y2))
    # Let's crop tighter to the actual logo pixels inside this box
    arr = np.array(cropped)
    # Background is near white (r > 240, g > 240, b > 240)
    is_fg = (arr[:, :, 0] < 240) | (arr[:, :, 1] < 240) | (arr[:, :, 2] < 240)
    
    # Find bounding box of foreground
    rows = np.any(is_fg, axis=1)
    cols_fg = np.any(is_fg, axis=0)
    
    if np.any(rows) and np.any(cols_fg):
        rmin, rmax = np.where(rows)[0][[0, -1]]
        cmin, cmax = np.where(cols_fg)[0][[0, -1]]
        
        # Add a little padding
        pad = 6
        rmin = max(0, rmin - pad)
        rmax = min(arr.shape[0] - 1, rmax + pad)
        cmin = max(0, cmin - pad)
        cmax = min(arr.shape[1] - 1, cmax + pad)
        
        tight_logo = cropped.crop((cmin, rmin, cmax + 1, rmax + 1))
        
        # Make white background transparent (RGBA)
        tight_rgba = tight_logo.convert("RGBA")
        t_arr = np.array(tight_rgba)
        
        # Calculate alpha based on darkness: if white, alpha = 0. If dark, alpha = 255
        # The background is approx (254, 254, 254)
        gray = 0.299 * t_arr[:, :, 0] + 0.587 * t_arr[:, :, 1] + 0.114 * t_arr[:, :, 2]
        # Map 250..255 -> 0, < 240 -> 255
        alpha = np.clip((250 - gray) / 15.0 * 255, 0, 255).astype(np.uint8)
        
        # Keep original RGB or grayscale
        t_arr[:, :, 3] = alpha
        
        res = Image.fromarray(t_arr)
        out_path = rf"public\partners\{name}.png"
        res.save(out_path)
        print(f"Saved {out_path} ({res.size})")
    else:
        cropped.save(rf"public\partners\{name}.png")
        print(f"Saved fallback {name}.png")

