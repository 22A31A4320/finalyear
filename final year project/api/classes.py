"""Vercel serverless: GET /api/classes"""
from http.server import BaseHTTPRequestHandler
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from classes import IDX_TO_CLASSES, format_label  # noqa: E402
from recommendations import all_class_pills  # noqa: E402


class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        data = {
            "classes": [
                {"idx": i, "label": format_label(IDX_TO_CLASSES[i]), "raw": IDX_TO_CLASSES[i]}
                for i in range(len(IDX_TO_CLASSES))
            ],
            "pills": all_class_pills(),
        }
        body = json.dumps(data).encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
