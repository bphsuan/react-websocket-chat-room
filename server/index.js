const express = require("express");
const app = express();
const http = require("http").Server(app);
const cors = require("cors");

const PORT = 4000;

app.use(cors());

const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socketIO.emit("newUserResponse", users);

  socket.on("message", (data) => {
    socketIO.emit("messageResponse", data);
  });

  socket.on("newUser", (data) => {
    users.push(data);

    socketIO.emit("newUserResponse", users);
  });

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");

    users = users.filter((user) => user.socketID !== socket.id);

    socketIO.emit("newUserResponse", users);

    socket.disconnect();
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
