import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:5000");

function subscribeToNotifications(callback, userId) {
  socket.on("notification", (data) => callback(data));
  socket.emit("subscribeToNotifications", userId);
}
export { subscribeToTimer };
