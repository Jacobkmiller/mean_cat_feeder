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
const path = require('path');
const gpio = require('rpi-gpio');


const WebStreamerServer = require('./h264-live-player/lib/raspivid');

const app  = express();

  //public website
//app.use(express.static(__dirname + '/public'));

//app.use(express.static(__dirname ));
app.use(express.static(__dirname + '/h264-live-player/vendor/dist'));

//app.use(express.static(__dirname ));
//app.use(express.static(__dirname + '/vendor/dist'));
app.get("/", function(req,res){
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/on', function(req, res){
  gpio.setup(4, gpio.DIR_OUT, function(){
    gpio.write(4, true);
  });
});

app.get('/off', function(req, res){
  gpio.setup(4, gpio.DIR_OUT, function(){
    gpio.write(4, false);
  });
});


const server  = http.createServer(app);
const silence = new WebStreamerServer(server);

const port = 8081;
console.log("Listening on port " + port);
server.listen(port);

