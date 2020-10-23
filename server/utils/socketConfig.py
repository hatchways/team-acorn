
from extensions import socketio
from flask_socketio import emit, join_room, leave_room


@socketio.on('subscribeToNotifications')
def joined(user_id):
    print("message")
    join_room(user_id)
    emit('message', "You have subscribed", room=user_id)

def sendNotification(user_id):
    emit('notification', "recieved Notification", room=user_id)