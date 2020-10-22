
from extensions import socketio
from flask_socketio import emit, join_room, leave_room
@socketio.on('subscribeToNotifications')
def joined(email):
    print("message")
    join_room(email)
    emit('message', "You have subscribed", room=email)