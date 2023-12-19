import speech_recognition as sr
from time import sleep
# import keyboard  # pip install keyboard

# obtain audio from the microphone
def listen():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        print("AI is listening...")
        audio = r.listen(source)

    # recognize speech using Google Speech Recognition
    try:
        speech = r.recognize_google(audio)
        return speech
    except sr.UnknownValueError:
        print("Google Speech Recognition could not understand audio")
    except sr.RequestError as e:
        print(
            "Could not request results from Google Speech Recognition service; {0}".format(
                e
            )
        )
        exit(1)

    return None


def listen_with_start_stop():
    go = 1

    def quit():
        global go
        print("q pressed, exiting...")
        go = 0


    keyboard.on_press_key("q", lambda _: quit())  # press q to quit

    r = sr.Recognizer()
    mic = sr.Microphone()
    print(sr.Microphone.list_microphone_names())

    mic = sr.Microphone(device_index=1)


    while go:
        try:
            sleep(0.01)
            with mic as source:
                print("AI is listening...")
                audio = r.listen(source)
                print(r.recognize_google(audio))
        except:
            pass


if __name__ == "__main__":
    while True:
        print(listen())
