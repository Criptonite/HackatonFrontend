"use strict";

let socket = io();
let first = document.getElementById("first");
let second = document.getElementById("second");
let third = document.getElementById("third");


socket.emit("new user");


socket.on("got links", (links)=>{
   first.href = links[0];
   second.href = links[1];
   third.href = links[2];
});




