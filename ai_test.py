import os
from google import genai
from google.genai import types

# Get API key
api_key = os.getenv("GEMINI_API_KEY")

# Create Gemini client
client = genai.Client(api_key=api_key)

# Sample support case
text = """
The customer reports that they are unable to complete the RTM project
configuration. The issue started after a recent configuration change.
They receive an error when trying to save the project settings.
"""

# Ask Gemini to analyze the text
response = client.models.generate_content(
    model="gemini-3.5-flash-lite",
    contents=f"""
Analyze the following support case.

Provide the following:

1. What is this case about?
2. Main issue
3. Possible cause
4. Suggested next steps

Keep the answer simple and useful for a technical support engineer.

Support case:
{text}
""",
    config=types.GenerateContentConfig(
        automatic_function_calling=types.AutomaticFunctionCallingConfig(
            disable=True
        )
    )
)

print("\n===== AI ANALYSIS =====\n")
print(response.text)