"use strict";

let http = require("http");
let express = require("express");
let sock = require("socket.io");
let path = require("path");
let bodyParser = require("body-parser");
let request = require('request');
var cheerio = require('cheerio');

const port = 8080;
const app = express();
const server = http.Server(app);
const server_socket = sock(server);


app.use("/static", express.static(path.join(__dirname, "/static")));

// app.use("/static", express.static(path.join(__dirname, "/static")));

const stack_basic = "https://stackoverflow.com/users/";

let stack_links = [];


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", (req, res) => {
    res.sendfile("./static/index.html");
});

app.post("/findexperts", (req, res) => {

    let url_from_request = req.body.question;
    var options = {
        host: 'localhost',
        port: 10001,
        headers: {"url": url_from_request},
        path: "/find"
    };
    console.log(options);
    let callback = (response) => {
        let str = '';
        response.on('data', function (chunk) {
            str += chunk;
        });

        response.on('end', function () {
            console.log(str);

            function sendLinks(str) {
                let parsed = JSON.parse(str);

                stack_links.push(stack_basic + parsed.ids[0])
                stack_links.push(stack_basic + parsed.ids[1])
                stack_links.push(stack_basic + parsed.ids[2])
                console.log(stack_basic + parsed.ids[0])
                console.log(stack_basic + parsed.ids[1])
                console.log(stack_basic + parsed.ids[2])

                server_socket.sockets.emit("infa", stack_links);
            }

            sendLinks(str)
        });
    };
    http.request(options, callback).end();
    res.sendfile("./static/result.html");
});


server_socket.on("connection", (socket) => {
    socket.on("connect", () => {
        console.log("Connected", socket.id)
    });

    socket.on("new user", () => {
        console.log("Connected", socket.id)
    });
});


function getIdFromUrl(url) {
    let post_id = url.match(/\d+/);
    return post_id[0];
}


server.listen(port, () => {
    console.log("Server starts on port:", port)
});








