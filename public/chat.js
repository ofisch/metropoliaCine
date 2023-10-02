"use strict";

const socket = io("http://localhost:3000");

const currentRoom = "movie1";

const user = document.getElementById("username");
const joinForm = document.getElementById("join-form");
const msgForm = document.getElementById("msg-form");
const usernameInput = joinForm.getElementsByTagName("input")[0];
const messageInput = msgForm.getElementsByTagName("input")[0];

msgForm.classList.remove("flex");
msgForm.classList.add("hidden");

function isEmptyOrSpaces(str) {
  return str === null || str.match(/^ *$/) !== null;
}

msgForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!isEmptyOrSpaces(messageInput.value)) {
    socket.emit("chat message", messageInput.value);
    messageInput.value = "";
  }
});

joinForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (user.value) {
    const selectedRoom = currentRoom;
    const nickname = user.value;
    socket.emit("joinRoom", { roomName: selectedRoom, nickname });

    joinForm.classList.remove("flex");
    joinForm.classList.add("hidden");
    msgForm.classList.remove("hidden");
    msgForm.classList.add("flex");
    messageInput.focus();
  }
});

socket.on("chat message", (msg) => {
  let chatMessage = document.createElement("li");

  chatMessage.innerHTML = `<li class="flex py-2">
    <p class="p-3 font-bold text-white">${msg.nickname}: </p>
    <p class="p-3 bg-blue rounded-r-lg rounded-bl-lg">${msg.msg}</p>
  </li>`;

  document.getElementById("messages").appendChild(chatMessage);
  document.getElementById("messages").scrollTo(0, messages.scrollHeight);
});
