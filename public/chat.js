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
  let msgElement = document.createElement("li");

  let msgSender = document.createElement("p");
  msgSender.classList.add("p-3", "font-bold", "text-white");

  let msgData = document.createElement("p");
  msgData.classList.add("p-3", "bg-blue", "rounded-r-lg", "rounded-bl-lg");

  // innerText, jotta syöte luetaan tekstinä (ei esim. html)
  msgSender.innerText = msg.nickname;
  msgData.innerText = msg.msg;

  msgElement.classList.add("flex", "py-2");

  msgData.classList.add(
    "transition",
    "ease-in-out",
    "delay-70",
    "hover:-translate-y-1",
    "hover:scale-110",
    "hover:opacity-75",
    "duration-70",
    "overflow-auto",
    "max-w-xs"
  );

  msgElement.appendChild(msgSender);
  msgElement.appendChild(msgData);

  document.getElementById("messages").appendChild(msgElement);
  document.getElementById("messages").scrollTo(0, messages.scrollHeight);
});
