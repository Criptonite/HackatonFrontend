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


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", (req, res) => {
    res.sendfile("./static/index.html");
});

app.post("/findexperts", (req, res) => {

    let url_from_request = req.body.question;
    var options = {
        host: 'localhost',
        port: 10000,
        path: '/?link=\"' + url_from_request + '\"'
    };
    console.log(options);
    let callback = () => {
        var str = '';

        response.on('data', function (chunk) {
            str += chunk;
        });

        response.on('end', function () {
            console.log(str);
        });
    };
    http.request(options, callback).end();
    res.sendfile("./static/index.html");
});

app.post("/");


function getIdFromUrl(url) {
    let post_id = url.match(/\d+/);
    return post_id[0];
}

function getBody(req_id) {

}


server.listen(port, () => {
    console.log("Server starts on port:", port)
});








