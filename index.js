"use strict";

const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static(__dirname));

const users = [];
const rooms = ["movie1", "movie2", "movie3"];
const history = [];
const client = [];

const getUserList = (roomName) => {
  let userList = "";
  for (const user of users) {
    if (user.roomName === roomName) {
      userList += user.username + "\n";
    }
  }
  return userList;
};

const getUserName = (socketId) => {
  return users.find((user) => user.id === socketId)?.username;
};

const deleteUserById = (socketId) => {
  try {
    const index = users.findIndex((user) => user.id === socketId);
    console.log("deleting user", users[index]);
    users.splice(index, 1);
  } catch (error) {
    console.warn("deleting user failed", error);
  }
};

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  socket.emit("rooms", rooms);

  socket.on("joinRoom", (data) => {
    const { roomName, nickname } = data;
    users.push({ username: nickname, id: socket.id, roomName });
    console.log(users);

    if (rooms.includes(roomName) && nickname) {
      if (socket.room) {
        socket.leave(socket.room);
      }

      socket.join(roomName);
      socket.room = roomName;
      socket.nickname = nickname;

      socket.emit("message", `You joined ${roomName}`);
      socket
        .to(roomName)
        .emit("message", `${socket.nickname} joined ${roomName}`);

      socket.on("chat message", (msg) => {
        console.log("message by: " + nickname, msg, " in ", roomName);
        if (msg === "!users") {
          socket.emit(
            "chat message",
            `Users online in ${roomName}: ${getUserList(roomName)}`
          );
        } else {
          const messageData = { nickname: getUserName(socket.id), msg: msg };
          io.to(roomName).emit("chat message", messageData);
        }
      });
    }
  });

  io.sockets.on("connection", (socket) => {
    client.push({ id: socket.client.id });
    console.log(client);

    let getClientID = client.find((e) => e.id === socket.client.id);
    console.log("the Client", getClientID);
    if (getClientID) {
      socket.emit("msg", history);
    }

    socket.emit("Start_Chat");
    socket.on("Register_Name", (data) => {
      console.log(data);
      io.sockets.emit(
        "r_name",
        "<strong>" + data + "</strong> Has Joined The Chat"
      );

      socket.on("Send_msg", (data) => {
        history.push(data);
        console.log(history);
        io.sockets.emit("msg", data);
      });
    });
  });

  socket.on("disconnect", () => {
    console.log(
      "a user disconnected",
      socket.nickname,
      socket.socketId,
      socket.room
    );
    if (socket.room) {
      socket
        .to(socket.room)
        .emit("message", `${socket.nickname} left ${socket.room}`);
      deleteUserById(socket.id);
    }
  });
});

http.listen(3000, () => {
  console.log("listening on port 3000");
});
