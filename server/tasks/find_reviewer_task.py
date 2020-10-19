import time
from server.models.user_model import UserModel

def find_reviewer(lang_lvls):
    # Takes in dictionary of required language levels the 
    # reviewer must have. If the user satisfies the requirements, assign
    # user to revquest
    pass


# Test task
def background_task(n):
    delay = 7
    print("Task Running")
    print(f"Simulating {delay} second delay")

    time.sleep(delay)

    print(len(n))
    print("Task complete.")

    return len(n)
        