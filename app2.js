/**
 * Created by Zachary on 5/24/2017.
 */
"use strict";

/**
* Run this on a raspberry pi
* then browse (using google chrome/firefox) to http://[pi ip]:8080/
*/


const http    = require('http');
const express = require('express');


const WebStreamerServer = require('./h264-live-player/lib/raspivid');

const app  = express();

  //public website
//app.use(express.static(__dirname + '/public'));
//app.use(express.static(__dirname ));
app.use(express.static(__dirname + '/vendor/dist'));
app.get


const server  = http.createServer(app);
const silence = new WebStreamerServer(server);

const port = 8081;
console.log("Listening on port " + port);
server.listen(port);

