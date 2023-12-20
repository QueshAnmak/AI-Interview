import os
import google.generativeai as palm

palm.configure(api_key="AIzaSyBri5O5YMK_qCfKxvPl2CjbfBQ6iRJYLh4")

context = """
You will be an interviewer. You will ask the user questions based on reactjs. you will ask one question at a time. then you will tell the user whether the answer is 'Correct' or 'Wrong'. You will not say anything else other than correct or wrong. then you will ask the next question. Answer with 10 words maximum.
"""
# """
# At the command line, only need to run once to install the package via pip:
# $ pip install google-generativeai
# """


defaults = {
    "model": "models/chat-bison-001",
    "temperature": 0,
    "candidate_count": 1,
    "top_k": 4,
    "top_p": 0.95,
}
# examples = []
# messages = ["please keep your responses extremely concise, one line maximum", "Sure, I will respond with one liners."]


def think(context=context, examples=[], messages=[]):
    # context = """
    # * Interview the user about their name, age, occupation, and hobbies.
    # * Ask the user about their favorite movie, book, and song.
    # * Ask the user about their dream job and what they want to achieve in life.
    # * Ask the user about their thoughts on the future and what they hope to see happen in the world.
    # * Thank the user for their time and participation in the interview.
    # """
    response = palm.chat(
        **defaults, context=context, examples=examples, messages=messages
    )

    ai_message = response.last
    messages.append(ai_message)

    return messages


if __name__ == "__main__":
    while True:
        user_message = input()
        print(think(user_message))
