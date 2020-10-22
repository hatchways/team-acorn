import socketIOClient from "socket.io-client";
const socket = socketIOClient("http://localhost:5000");

function subscribeToNotifications({ callback, userEmail }) {
  console.log("SUBSCRIBING");
  socket.on("notification", (data) => callback(data));
  socket.on("message", (data) => {});
  socket.emit("subscribeToNotifications", userEmail);
}

export { subscribeToNotifications };
