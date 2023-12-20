class Role:
    SYSTEM = "System"
    USER = "User"
    AI = "AI"

def print_message(role, message):
    print()
    print(role)
    print("-----------------------")
    print(message)
    print()
