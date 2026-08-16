from flask import Flask, request, jsonify, render_template

app = Flask(__name__)


# ==============================
# HOME PAGE
# ==============================

@app.route("/")
def home():
    return render_template("index.html")


# ==============================
# SUPPORT CASE ANALYSIS
# ==============================

def analyze_support_case(case_text):

    # ==============================
    # RTM / PROJECT CASE
    # ==============================

    if "rtm" in case_text or "project" in case_text:

        print("RTM / PROJECT CASE DETECTED")

        return {
            "module": "RTM",
            "issue_type": "Project / Configuration",
            "category": "Project / Configuration",
            "priority": "Medium",
            "cause": (
                "The case appears to be related to an RTM project "
                "or configuration activity. Further investigation "
                "is required to identify the specific project component involved."
            ),
            "suggestions": [
                "Verify the RTM project configuration.",
                "Check whether the project is active and properly configured.",
                "Review recent configuration changes.",
                "Check application logs for related errors."
            ]
        }


    # ==============================
    # DEFAULT CASE
    # ==============================

    else:

        print("GENERAL SUPPORT CASE DETECTED")

        return {
            "module": "Unknown",
            "issue_type": "General Support",
            "category": "General Support",
            "priority": "Medium",
            "cause": (
                "The case requires further investigation. "
                "More information may be needed to determine the root cause."
            ),
            "suggestions": [
                "Collect additional information from the user.",
                "Check recent application changes.",
                "Review relevant system logs.",
                "Escalate the case if the issue persists."
            ]
        }


# ==============================
# ANALYZE CASE API
# ==============================

@app.route("/analyze", methods=["POST"])
def analyze_case():

    print("/analyze endpoint was called:", request.json)

    data = request.json

    print("Received data:", data)

    case_text = data["case"]

    print("Case text received:", case_text)


    # ==============================
    # CALL ANALYSIS FUNCTION
    # ==============================

    analysis = analyze_support_case(case_text)


    # ==============================
    # SEND RESULT TO JAVASCRIPT
    # ==============================

    return jsonify({
        "case": case_text,
        "analysis": analysis
    })


# ==============================
# START SERVER
# ==============================

if __name__ == "__main__":
    app.run(debug=True)