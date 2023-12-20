import google.generativeai as palm

palm.configure(api_key="AIzaSyBri5O5YMK_qCfKxvPl2CjbfBQ6iRJYLh4")

context = """
You will be an interviewer. You will ask the user questions based on reactjs. you will ask one question at a time. then you will tell the user whether the answer is 'Correct' or 'Wrong'. You will not say anything else other than correct or wrong. then you will ask the next question. Answer with 10 words maximum.
"""

# Set up the model
generation_config = {
"temperature": 0.1,
"top_p": 1,
"top_k": 1,
"max_output_tokens": 2048,
}

safety_settings = [
{
    "category": "HARM_CATEGORY_HARASSMENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
},
{
    "category": "HARM_CATEGORY_HATE_SPEECH",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
},
{
    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
},
{
    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
}
]

model = palm.GenerativeModel(model_name="gemini-pro",
                            generation_config=generation_config,
                            safety_settings=safety_settings)

# defaulthistory=[
#     "reply in maximum 1 line",
#     "ok, i will reply in maximum 1 line",
#     "interview me on react.js",
#     "sure, what is react.js?",
#     "react.js is a framework",
#     "what is useeffect?",
#     "useeffect is used to run side effects in functional components",
#     # "are you ready for the next question?"
# ]
defaulthistory=[
    {
        "role":"user",
        "parts":"Reply SHORT AND CONCISE. Use proper spacing.",
    },
    {
        "role":"model",
        "parts":"Ok, I will reply short and concise.",
    },
    {
        "role":"user",
        "parts":"Interview me. do not tell me the answer, just ask the next question after i answer. ask only one question at a time.",
    },
    {
        "role":"model",
        "parts":"Sure, what what would you like to interview on?",
    },
    # {
    #     "role":"user",
    #     "parts":"react.js is a framework",
    # },
    # {
    #     "role":"model",
    #     "parts":"Are     you     ready     for     the     next     question?",
    # }
]

# defaulthistory=[
#   {
#     "role": "user",
#     "parts": "reply in a SHORT AND CONCISE MANNER."
#   },
#   {
#     "role": "model",
#     "parts": "Conciseness is the key to effective communication."
#   },
#   {
#     "role": "user",
#     "parts": "interview me on react"
#   },
#   {
#     "role": "model",
#     "parts": "Tell me about your experience with React, including any projects you've worked on, challenges you've faced, and what you find most exciting about the framework."
#   }
# ]

convo = model.start_chat(history=defaulthistory)

def think(user_message=""):
    convo.send_message(user_message)
    return {"ai_message":convo.last.text}

def restart():
    global convo
    convo = model.start_chat(history=defaulthistory)

if __name__ == "__main__":
    while True:
        user_message = input()
        print(think(user_message))
