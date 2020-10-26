import socketIOClient from "socket.io-client";
const socket = socketIOClient("http://localhost:5000");

function subscribeToNotifications({ callback, userId }) {
  socket.on("notification", (data) => {
    callback({ type: "setHasNewNotification", payload: { message: data.msg } });
  });
  socket.emit("subscribeToNotifications", userId);
}

export { subscribeToNotifications };
