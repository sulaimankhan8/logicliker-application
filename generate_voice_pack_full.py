"""
Kiddy Learn - Comprehensive Audio Universe Compiler
Synthesizes all 272 natural human child voice lines into local MP3 assets with 0ms playback latency.
"""

import os
import sys
import json
import asyncio
import edge_tts

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "assets", "audio")

async def generate_single_audio(sem, key, text, voice):
    async with sem:
        out_path = os.path.join(OUTPUT_DIR, f"{key}.mp3")
        # If already exists and size > 1000 bytes, skip to speed up
        if os.path.exists(out_path) and os.path.getsize(out_path) > 1000:
            return key, text, f"assets/audio/{key}.mp3"
        
        try:
            communicate = edge_tts.Communicate(text, voice, rate="+2%", pitch="+10Hz")
            await communicate.save(out_path)
            print(f"  [OK] Generated {key}.mp3")
            return key, text, f"assets/audio/{key}.mp3"
        except Exception as e:
            print(f"  [ERR] Failed {key}: {e}")
            return key, text, None

async def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    voice = "en-US-AnaNeural"

    with open("speech_catalog.json", "r", encoding="utf-8") as f:
        catalog = json.load(f)

    print(f"[*] Starting synthesis of {len(catalog)} audio lines using {voice}...")

    sem = asyncio.Semaphore(6) # 6 concurrent downloads
    tasks = []
    for key, text in catalog.items():
        if text and len(text.strip()) > 0:
            tasks.append(generate_single_audio(sem, key, text.strip(), voice))

    results = await asyncio.gather(*tasks)

    manifest = {}
    for res in results:
        if res and res[2]:
            key, text, rel_path = res
            manifest[key] = {
                "text": text,
                "file": rel_path
            }

    manifest_path = os.path.join(os.path.dirname(__file__), "js", "audio_manifest.json")
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2)

    print(f"\n[+] Completed! Total {len(manifest)} audio files compiled to {OUTPUT_DIR}")
    print(f"[+] Audio manifest saved to {manifest_path}")

if __name__ == "__main__":
    asyncio.run(main())
