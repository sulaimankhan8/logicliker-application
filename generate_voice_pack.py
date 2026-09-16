"""
Kiddy Learn - Static Voice Pack Pre-Compiler
Generates and compiles all application voice lines into high-quality local MP3 assets.
"""

import os
import sys
import asyncio
import json
import edge_tts

# Full comprehensive catalog of all speech lines across Kiddy Learn
AUDIO_CATALOG = {
    # 1. Mascot Companion Reactions (Leo)
    "leo_greeting_1": "Hi friend! Let's learn and play!",
    "leo_greeting_2": "I'm ready for another fun puzzle! Let's go!",
    "leo_tickle_1": "Hehehe! That tickles!",
    "leo_roar_1": "Roaaar! Just kidding, I'm friendly!",
    "leo_highfive": "High five, bestie!",
    "leo_cheer_1": "WOOHOO! Brilliant job! You solved it!",
    "leo_cheer_2": "SUPERSTAR! That was amazing!",
    "leo_cheer_3": "You are a true logic champion!",
    "leo_oops_1": "Oopsie! That's okay, let's try one more time!",
    "leo_oops_2": "You're super close! Take another look!",
    "leo_oops_3": "No worries! We learn by trying!",
    "leo_hint_1": "Hmm, let's put on our thinking caps!",
    "leo_hint_2": "Look closely at the colors and shapes!",
    "leo_hint_3": "Follow the glowing pointer!",
    "leo_sleep_1": "Yaaawn... Great learning today! Time for bed!",
    "leo_sleep_2": "Sleep tight little champion! See you tomorrow!",
    
    # 2. General Category & Game Prompts
    "prompt_pattern_match": "Choose the card that matches the pattern.",
    "prompt_odd_one_out": "Find the item that does not belong.",
    "prompt_count_items": "Count how many items you see on the screen.",
    "prompt_balance_scale": "Balance the scale by choosing the correct weight.",
    "prompt_matching_pairs": "Connect each item with its matching pair.",
    "prompt_listen_choose": "Listen carefully and pick the correct sound.",
    "prompt_trace_shape": "Trace along the dotted lines to complete the shape.",
    "prompt_memory_cards": "Find all the matching cards to win!",
    "prompt_sudoku_matrix": "Fill the empty spots so each row and column has unique items.",
    "prompt_spatial_cubes": "Count how many 3D blocks are in the structure."
}

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "assets", "audio")

async def generate_all_voices():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    # en-US-AnaNeural is an authentic natural child companion voice
    voice = "en-US-AnaNeural" 

    print(f"[*] Compiling {len(AUDIO_CATALOG)} audio files using natural voice: {voice}")

    manifest = {}
    for key, text in AUDIO_CATALOG.items():
        out_path = os.path.join(OUTPUT_DIR, f"{key}.mp3")
        relative_path = f"assets/audio/{key}.mp3"
        print(f"  -> Generating: {key}.mp3")
        
        communicate = edge_tts.Communicate(text, voice, rate="+2%", pitch="+10Hz")
        await communicate.save(out_path)
        manifest[key] = {
            "text": text,
            "file": relative_path
        }

    manifest_path = os.path.join(os.path.dirname(__file__), "js", "audio_manifest.json")
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2)

    print(f"\n[+] Success! All {len(AUDIO_CATALOG)} MP3 files saved to: {OUTPUT_DIR}")
    print(f"[+] Manifest generated at: {manifest_path}")

if __name__ == "__main__":
    asyncio.run(generate_all_voices())
