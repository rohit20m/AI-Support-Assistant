from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


@app.route("/")
def home():
    return "AI Support Assistant Backend is Running"


@app.route("/analyze", methods=["POST"])
def analyze_case():
    data = request.json
    case_text = data["case"]

    return {
        "message": "Python received your support case!",
        "case": case_text
    }


if __name__ == "__main__":
    app.run(debug=True)
