import socketIOClient from "socket.io-client";
const socket = socketIOClient("http://localhost:5000");

function subscribeToNotifications({ callback, userId }) {
  console.log("SUBSCRIBING");
  socket.on("notification", (data) => {
    alert(data);
    callback(data);
  });
  socket.on("message", (data) => {});
  socket.emit("subscribeToNotifications", userId);
}

export { subscribeToNotifications };
