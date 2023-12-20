import win32com.client as wincom

speak = wincom.Dispatch("SAPI.SpVoice")

text = "Python text-to-speech test. using win32com.client"
speak.Speak(text)
