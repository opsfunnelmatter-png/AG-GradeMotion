import os
import json
import time
from youtube_transcript_api import YouTubeTranscriptApi

videos = [
    # Core Pure 2 (May 2025)
    {"id": "fLSixCfxyj0", "paper": "CP2", "q": "Q9", "title": "Differentiation of Inverse Sine Functions"},
    {"id": "mq08Fx6D0tM", "paper": "CP2", "q": "Q8", "title": "Maclaurin Series and Hyperbolic Differentiation"},
    {"id": "llLqFVduG0A", "paper": "CP2", "q": "Q7bc", "title": "Polar Area and Cosine Rule Applications"},
    {"id": "r6RBCZ6TRG0", "paper": "CP2", "q": "Q7a", "title": "Polar Coordinates (Vertical Tangents)"},
    {"id": "RmpPp80YdSg", "paper": "CP2", "q": "Q6", "title": "Roots of Polynomials (Quartic Equations)"},
    {"id": "uvgfNhLMbJ0", "paper": "CP2", "q": "Q5", "title": "Simultaneous Equations (Planes and Sheaf)"},
    {"id": "LeTeo4ppaxU", "paper": "CP2", "q": "Q4", "title": "Complex Numbers (Equations & Argand Loci)"},
    {"id": "25BxITgZHI0", "paper": "CP2", "q": "Q3bcd", "title": "Matrix Transformations and Combined Matrices"},
    {"id": "X5zWDanSgIY", "paper": "CP2", "q": "Q3a", "title": "Mathematical Induction (Matrices)"},
    {"id": "g6cUklAUg7Q", "paper": "CP2", "q": "Q2", "title": "Vectors (Lines and Planes)"},
    {"id": "1smjwIDMQXU", "paper": "CP2", "q": "Q1", "title": "Complex Numbers (Modulus & Argument Properties)"},
    
    # Core Pure 1 (May 2025)
    {"id": "lCgUg77yqis", "paper": "CP1", "q": "Q10", "title": "Volumes of Revolution (Trigonometric Identities)"},
    {"id": "DU4p24nh3pY", "paper": "CP1", "q": "Q8", "title": "Differential Equations (Modelling & Integrating Factor)"},
    {"id": "tfTDvCVdSnk", "paper": "CP1", "q": "Q7b", "title": "Definite Integration & Natural Logs"},
    {"id": "O_AN-GuxrYs", "paper": "CP1", "q": "Q7a", "title": "Partial Fractions & Improper Fractions"},
    {"id": "y9_rkSUzQto", "paper": "CP1", "q": "Q9", "title": "Hyperbolic Functions & Integration"},
    {"id": "1ZsITmrhHIw", "paper": "CP1", "q": "Q6", "title": "Complex Numbers (Cubic Roots and Argand Diagrams)"},
    {"id": "6ZNaOB4TucA", "paper": "CP1", "q": "Q5", "title": "Method of Differences (Summation Proof)"},
    {"id": "zO7g4UAC--o", "paper": "CP1", "q": "Q4", "title": "Second Order Differential Equations"},
    {"id": "INF0JSk88dc", "paper": "CP1", "q": "Q3", "title": "Complex Numbers (Purely Imaginary Proof)"},
    {"id": "uiFGdDFbvIg", "paper": "CP1", "q": "Q2", "title": "Hyperbolic Functions (Exact Values Walkthrough)"},
    {"id": "2La5fjgOZfw", "paper": "CP1", "q": "Q1", "title": "Matrices (Singular & Inverse Matrix)"}
]

out_dir = os.path.join(os.path.dirname(__file__), '..', 'data', 'transcripts')
os.makedirs(out_dir, exist_ok=True)

api = YouTubeTranscriptApi()
success = 0
for v in videos:
    vid = v['id']
    file_path = os.path.join(out_dir, f"{vid}.json")
    if os.path.exists(file_path):
        print(f"Skipping existing: {vid}")
        success += 1
        continue
    try:
        print(f"Fetching {vid} ({v['paper']} {v['q']})...")
        t = api.fetch(vid)
        snippets = [{"text": s.text, "start": s.start, "duration": s.duration} for s in t.snippets]
        full_text = " ".join([s["text"] for s in snippets])
        data = {
            "id": vid,
            "paper": v["paper"],
            "question": v["q"],
            "title": v["title"],
            "full_text": full_text,
            "snippets": snippets
        }
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print(f"  -> Saved {len(snippets)} snippets ({len(full_text.split())} words)")
        success += 1
        time.sleep(0.5)
    except Exception as e:
        print(f"  -> Error fetching {vid}: {e}")

print(f"\nDone! Successfully saved {success}/{len(videos)} transcripts.")
