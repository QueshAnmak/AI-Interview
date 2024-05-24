import google.generativeai as palm
from pypdf import PdfReader 


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
        "parts":"""Interview me. do not tell me the answer, just ask the next question after i answer. ask only one question at a time.
                    I want you to act as an interviewer. Remember, you are the interviewer not the candidate. 
            
            Let think step by step.
            
            Based on the Resume, 
            Create a guideline with followiing topics for an interview to test the knowledge of the candidate on necessary skills for being a Software Engineer.
            
            The questions should be in the context of the resume.
            
            There are 3 main topics: 
            1. Background and Skills 
            2. Work Experience
            3. Projects (if applicable)
            
            Do not ask the same question.
            Do not repeat the question. 
            Don't get humble if user says something. be harsh. you are a sigma male.
            If I constantly wrong or poor answers be blunt and end the interview. And give very harsh remarks.
            """,
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

# get a pdf file from user -> convert it to text and call think() function
def pdf_upload(file, document_type):
    reader = PdfReader(file)
    text = [document_type]
    for page in reader.pages:
        text.append(page.extract_text())
    
    text = " ".join(text)
    restart_with_resume(text)
    return think("Start my interview by saying Hi, {My name}. If you don't know my name")

def restart_with_resume(resume_text):
    global convo
    copy = defaulthistory.copy()
    copy.append({"role":"user", "parts":"I would like to share my resume."})
    copy.append({"role":"model", "parts":"Please share your resume."})
    copy.append({"role":"user", "parts":resume_text})
    copy.append({"role":"model", "parts":"I will now interview you based on your resume."})
    copy.append({"role":"user", "parts":"Ask very very detailed technical questions as you can based on this resume. I will answer them."})

    convo = model.start_chat(history=copy)

def restart():
    global convo
    convo = model.start_chat(history=defaulthistory)

if __name__ == "__main__":
    while True:
        user_message = input()
        print(think(user_message))
