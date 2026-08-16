User enters case
      ↓
HTML textarea
      ↓
JavaScript click event
      ↓
caseText is created
      ↓
JavaScript sends POST request
      ↓
Flask / Python receives it
      ↓
request.json
      ↓
case_text = data["case"]
      ↓
Python processes it
      ↓
Python returns JSON
      ↓
JavaScript receives JSON
      ↓
UI is updated