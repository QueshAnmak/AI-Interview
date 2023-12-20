from stt import listen, listen_with_start_stop
from genai import think
from tts import say
from utils import Role, print_message


def main():
    try:
        while True:
            user_message = listen()
            print_message(Role.USER, user_message)

            # print("User")
            # print("-------------------------")
            # user_message = input()
            # print()

            if user_message is None:
                reply = "Sorry, I didn't get that, could you please repeat?"

            elif "exit" in user_message.lower():
                end_message = "Exiting..."
                print_message(Role.SYSTEM, end_message)
                break

            else:
                print("AI is thinking...")
                reply = think(user_message)

            print_message(Role.AI, reply)
            say(reply)
    except:
        end_message = "An error occurred."
        print_message(Role.SYSTEM, end_message)


if __name__ == "__main__":
    main()
