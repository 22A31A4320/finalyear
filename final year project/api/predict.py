"""Vercel serverless: POST /api/predict"""
from http.server import BaseHTTPRequestHandler
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from predict_service import predict_from_bytes  # noqa: E402


def _cors_headers(handler):
    handler.send_header("Access-Control-Allow-Origin", "*")
    handler.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
    handler.send_header("Access-Control-Allow-Headers", "Content-Type")


def _parse_multipart(handler):
    """Extract image bytes from multipart/form-data."""
    content_type = handler.headers.get("Content-Type", "")
    if "multipart/form-data" not in content_type:
        return None

    import cgi

    form = cgi.FieldStorage(
        fp=handler.rfile,
        headers=handler.headers,
        environ={
            "REQUEST_METHOD": "POST",
            "CONTENT_TYPE": content_type,
            "CONTENT_LENGTH": handler.headers.get("Content-Length", "0"),
        },
    )
    if "image" not in form:
        return None
    field = form["image"]
    if hasattr(field, "file"):
        return field.file.read()
    return field.value if isinstance(field.value, bytes) else None


class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(204)
        _cors_headers(self)
        self.end_headers()

    def do_POST(self):
        try:
            image_bytes = _parse_multipart(self)
            if not image_bytes:
                self._json(400, {"error": "No image uploaded. Use form field 'image'."})
                return

            result = predict_from_bytes(image_bytes)
            self._json(200, result)
        except Exception as exc:
            self._json(500, {"error": str(exc)})

    def do_GET(self):
        self._json(405, {"error": "Use POST with multipart image"})

    def _json(self, status, payload):
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        _cors_headers(self)
        self.end_headers()
        self.wfile.write(body)
