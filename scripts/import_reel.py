import subprocess
import json
import os
import sys

def import_instagram_reel(url: str, out_dir: str):
    os.makedirs(out_dir, exist_ok=True)
    # 1. Dump metadata
    cmd_meta = ["python", "-m", "yt_dlp", "--dump-json", url]
    proc = subprocess.run(cmd_meta, capture_output=True, text=True, errors='ignore', timeout=60)
    if proc.returncode != 0 or not proc.stdout.strip():
        return {"success": False, "error": proc.stderr or "Failed to extract reel metadata from Instagram URL"}
    
    data = json.loads(proc.stdout)
    shortcode = data.get('display_id') or data.get('id') or "reel"
    description = (data.get('description') or "").strip()
    
    # Generate a nice clinical title from the first sentence/line of caption
    title = ""
    if description:
        lines = [line.strip() for line in description.split('\n') if line.strip() and not line.strip().startswith('#') and not line.strip().startswith('http')]
        if lines:
            first_line = lines[0].replace('“', '').replace('”', '').replace('"', '').strip()
            title = first_line[:90]
    if not title:
        title = data.get('title') or "Instagram Reel by Dr. Bhoomi Raval"
        
    duration_sec = data.get('duration')
    duration_str = f"0:{int(duration_sec):02d}" if duration_sec else "0:45"
    view_count = data.get('view_count') or data.get('like_count')
    views_str = f"{view_count:,}" if view_count else "2.5K"

    # 2. Download video
    target_vid_name = f"reel_{shortcode}.mp4"
    target_vid_path = os.path.join(out_dir, target_vid_name)
    target_thumb_name = f"thumb_{shortcode}.webp"
    target_thumb_path = os.path.join(out_dir, target_thumb_name)

    # Download video file using yt-dlp
    cmd_dl = [
        "python", "-m", "yt_dlp",
        "-f", "mp4/best",
        "-o", target_vid_path,
        "--force-overwrites",
        url
    ]
    subprocess.run(cmd_dl, capture_output=True, text=True, errors='ignore', timeout=90)

    # Download thumbnail
    thumb_url = data.get('thumbnail')
    if thumb_url:
        import urllib.request
        from PIL import Image
        import io
        try:
            req = urllib.request.Request(thumb_url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=30) as resp:
                img_data = resp.read()
                im = Image.open(io.BytesIO(img_data))
                im.save(target_thumb_path, 'WEBP', quality=85)
        except Exception as e:
            print("Thumb download err:", e)

    return {
        "success": True,
        "shortcode": shortcode,
        "title": title,
        "caption": description,
        "videoUrl": f"/uploads/reels/{target_vid_name}",
        "thumbnailUrl": f"/uploads/reels/{target_thumb_name}" if os.path.exists(target_thumb_path) else None,
        "duration": duration_str,
        "viewsCount": views_str,
        "instagramUrl": url
    }

if __name__ == "__main__":
    test_url = sys.argv[1] if len(sys.argv) > 1 else "https://www.instagram.com/reel/DYmrkzRIu7N/"
    target_folder = r"C:\Users\AVADH\.gemini\antigravity\scratch\manam-mental-health\public\uploads\reels"
    res = import_instagram_reel(test_url, target_folder)
    print(json.dumps(res, indent=2))
