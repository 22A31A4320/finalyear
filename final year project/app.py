"""
Smart Agro — Flask server (local development)
For production static hosting use Vercel — see VERCEL.md
Place trained weights at: model.pth for real CNN inference locally.
"""
import io
import os

from flask import Flask, jsonify, request, send_from_directory

from classes import IDX_TO_CLASSES, format_label
from predict_service import predict_from_bytes
from recommendations import all_class_pills

app = Flask(__name__, static_folder=".", static_url_path="")


@app.route("/")
def root():
    return send_from_directory(".", "home.html")


@app.route("/<path:path>")
def static_files(path):
    if path.startswith("api/"):
        return jsonify({"error": "Not found"}), 404
    safe = path.replace("..", "")
    if os.path.isfile(safe):
        return send_from_directory(".", safe)
    if safe.endswith(".html") or "." not in safe:
        return send_from_directory(".", "home.html")
    return jsonify({"error": "Not found"}), 404


@app.route("/api/predict", methods=["POST"])
def api_predict():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400
    file = request.files["image"]
    try:
        result = predict_from_bytes(file.read())
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/classes")
def api_classes():
    return jsonify({
        "classes": [{"idx": i, "label": format_label(IDX_TO_CLASSES[i]), "raw": IDX_TO_CLASSES[i]}
                    for i in range(NUM_CLASSES)],
        "pills": all_class_pills(),
    })


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)
