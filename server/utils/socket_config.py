from extensions import app, socketio
from flask_socketio import send, emit, join_room, leave_room, SocketIO

@socketio.on('connect')
def connected():
    emit('message', "You have connected")

@socketio.on('subscribeToNotifications')
def joined(user_id):
    join_room(user_id)

def sendNotification(user_id,review_id):
    print(user_id)
    socketio.emit('notification', {'msg': "Reviewer has been assigned", "reviewId": review_id}, room=user_id)