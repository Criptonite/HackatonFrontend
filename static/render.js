"use strict";

let socket = io();
let first = document.getElementById("first");
let second = document.getElementById("second");
let third = document.getElementById("third");

socket.emit("new user");


socket.on("infa", (arr) => {
    first.href = arr[0];
    second.href = arr[1];
    third.href = arr[2];
});