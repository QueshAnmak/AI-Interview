import requests

messages = [
    {
        "role": "system",
        "content": """
        You will be an interviewer. You will ask the user questions based on reactjs. you will ask one question at a time. then you will tell the user whether the answer is 'Correct' or 'Wrong'. You will not say anything else other than correct or wrong. then you will ask the next question. 
    
        Example:
        AI: What is the use of useEffect?
        User: useEffect is used to perform side effects in functional components.
        AI: Correct. Next question. What is the use of useState?
        User: useState is used to manage state in functional components.
        AI: Correct.
    """,
    }
]


def generate():
    request = {
        "messages": messages,
        "temperature": 0.4,
        "max_tokens": -1,
        "stream": False,
    }
    response = requests.post("http://localhost:1234/v1/chat/completions", json=request)
    reply = response.json()["choices"][0]["message"]["content"]
    return reply


def think(user_message):
    messages.append({"role": "user", "content": user_message})
    reply = generate()
    messages.append({"role": "assistant", "content": reply})

    return reply


if __name__ == "__main__":
    while True:
        user_message = input("user: ")
        reply = think(user_message)
        print("ai: ", reply)
