"use strict";
// get the http module:
const http = require('http');
// fs module allows us to read and write content for responses!!
const fs = require('fs');
// express
const express = require('express');
//node-rtsp-stream allows us to stream from on rtsp server to sockets on our server
//Stream = require('node-rtsp-stream');
// creating a server using http module:
const server = http.createServer(function (request, response){
    // see what URL the clients are requesting:
    console.log('client request URL: ', request.url);
    // this is how we do routing:
    if(request.url === '/') {
        fs.readFile('index.html', 'utf8', function (errors, contents){
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(contents);
            response.end();
        });
    }
    // request didn't match anything:
    else {
        response.end('File not found!!!');
    }
});

//stream = new Stream({
//	name: 'catfeeder',
//	streamUrl: 'rtsp://192.168.50.126:8554/',
//	wsPort: 9999
//});


// store port in a constant variable
const port = 8081;
// tell your server which port to run on
server.listen(port);
// print to terminal window
console.log("Running in localhost at port:" + port);
