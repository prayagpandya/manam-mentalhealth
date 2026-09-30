import os
from PIL import Image

assets_dir = r"C:\Users\AVADH\.gemini\antigravity\scratch\manam-mental-health\public\assets"

# Let's check which images are clinic interior vs talks vs doctor
# Let's inspect 6, 7, 12, 14, 15, 16, 23, 24
for f in ["6.webp", "7.webp", "10.webp", "11.webp", "12.webp", "14.webp", "15.webp", "16.webp", "23.webp", "24.webp"]:
    fp = os.path.join(assets_dir, f)
    if os.path.exists(fp):
        im = Image.open(fp)
        print(f"{f}: {im.size}")
