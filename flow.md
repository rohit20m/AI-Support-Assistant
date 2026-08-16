**Flow of the Project**

Browser requests /
       ↓
Flask
       ↓
render_template("index.html")
       ↓
Browser displays page
       ↓
User clicks Analyze Case
       ↓
script.js
       ↓
POST /analyze
       ↓
Flask
       ↓
Python analysis
       ↓
JSON
       ↓
script.js
       ↓
Dashboard