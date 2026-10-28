import os
import time
import cv2
from concurrent.futures import ThreadPoolExecutor

SOURCE_DIR = 'public/anii33'
DEST_DIR = 'public/anii33_hd'
TOTAL_FRAMES = 840

os.makedirs(DEST_DIR, exist_ok=True)

# Exact crop window removing the outer dark letterboxes
# Y: 58..310 (252px height)
# X: 4..364 (360px width)
# Scaling to 1440 x 1008 (crisp 4x upscale)

def process_frame(idx):
    src = os.path.join(SOURCE_DIR, f'frame_{idx:04d}.png')
    dst = os.path.join(DEST_DIR, f'frame_{idx:04d}.webp')
    
    img = cv2.imread(src)
    if img is None:
        return idx, False

    # 1. Clean crop of actual website content
    crop = img[58:310, 4:364]
    
    # 2. High-precision Lanczos-4 upscaling to 1440x1008
    up = cv2.resize(crop, (1440, 1008), interpolation=cv2.INTER_LANCZOS4)
    
    # 3. Unsharp mask for crisp high-frequency edges (architectural lines & typography)
    blur = cv2.GaussianBlur(up, (0, 0), 1.2)
    sharp = cv2.addWeighted(up, 1.5, blur, -0.5, 0)
    
    # 4. Save as high-quality WebP (quality 92 for razor-sharp clarity, ~50KB per frame)
    cv2.imwrite(dst, sharp, [cv2.IMWRITE_WEBP_QUALITY, 92])
    return idx, True

def main():
    print(f'Starting batch conversion of {TOTAL_FRAMES} frames...')
    start_time = time.time()
    
    with ThreadPoolExecutor(max_workers=8) as executor:
        results = list(executor.map(process_frame, range(1, TOTAL_FRAMES + 1)))
    
    elapsed = time.time() - start_time
    success_count = sum(1 for _, ok in results if ok)
    print(f'Successfully processed {success_count}/{TOTAL_FRAMES} frames in {elapsed:.2f} seconds ({elapsed/TOTAL_FRAMES:.3f}s per frame)')

if __name__ == '__main__':
    main()
