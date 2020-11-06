from extensions import app, socketio
from flask_socketio import send, emit, join_room, leave_room, SocketIO


@socketio.on("connect")
def connected():
    emit("message", "You have connected")


@socketio.on("subscribeToNotifications")
def joined(user_id):
    join_room(user_id)


def sendNotification(user_id, review_id, msg):
    socketio.emit("notification", {"msg": msg, "reviewId": review_id}, room=user_id)

@socketio.on("review_message")
def handleMessage(data):
    socketio.emit(data["review_id"], {"message_id": data["message_id"]})
    print("i m here in update message")
