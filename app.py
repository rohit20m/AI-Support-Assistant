from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


@app.route("/")
def home():
    return "AI Support Assistant Backend is Running"


@app.route("/analyze", methods=["POST"])
def analyze_case():

    # Debugging line to print the received JSON data
    print("/analyze endpoint was called :", request.json)

    data = request.json
    print("Received data:", data)  # Debugging line to print the received data

    case_text = data["case"]
    # Debugging line to print the case text
    print("Case text received:", case_text)

    # ==============================
    # RTM / PROJECT CASE
    # ==============================

    if "rtm" in case_text or "project" in case_text:

        print("Identified as RTM / Project case")  # Debugging line

        category = "Project / Configuration"
        priority = "Medium"
        cause = (
            "The case appears to be related to an RTM project "
            "or configuration activity. Further investigation "
            "is required to identify the specific project component involved."
        )
        suggestions = [
            "Verify the RTM project configuration.",
            "Check whether the project is active and properly configured.",
            "Review recent configuration changes.",
            "Check application logs for related errors."
        ]

    # ==============================
    # DEFAULT CASE
    # ==============================

    else:
        category = "General Support"
        priority = "Medium"
        cause = (
            "The case requires further investigation. "
            "More information may be needed to determine the root cause."
        )
        suggestions = [
            "Collect additional information from the user.",
            "Check recent application changes.",
            "Review relevant system logs.",
            "Escalate the case if the issue persists."
        ]

    # ==============================
    # SEND RESULT TO JAVASCRIPT
    # ==============================

    return jsonify({
        "case": case_text,
        "category": category,
        "priority": priority,
        "cause": cause,
        "suggestions": suggestions
    })


if __name__ == "__main__":
    app.run(debug=True)
