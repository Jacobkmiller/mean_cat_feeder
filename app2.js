/**
 * Created by Zachary on 5/24/2017.
 */
"use strict";

/**
* Run this on a raspberry pi
* then browse (using google chrome/firefox) to http://[pi ip]:8081/
*/


const http    = require('http');
const express = require('express');
const path = require('path');
const WebSocket = require('ws');
const gpio = require('pigpio').Gpio;

var light = gpio(4);
var servoy = gpio(17);
var servox = gpio(23);
var laser = gpio(24);
var pulsewidth = 1500;
var i = 200;
servoy.mode(gpio.OUTPUT);
servox.mode(gpio.OUTPUT);
light.mode(gpio.OUTPUT);
laser.mode(gpio.OUTPUT);
var laserToggle = false;

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
  console.log("Light On");
  light.digitalWrite(1); 
  res.send("ON");
});

app.get('/off', function(req, res){
  console.log("Light Off");
  light.digitalWrite(0);
  res.send("OFF");
});

app.get('/laser', function(req, res){
  if (laserToggle) {
    laser.digitalWrite(0);
    laserToggle = false;
    res.send("Laser OFF");
  } else {
    laser.digitalWrite(1);
    laserToggle = true;
    res.send("Laser ON");
  }
});


const server  = http.createServer(app);
const wss = new WebSocket.Server({server:server,
                                  path:'/servo',
                                  port:'3000'
});
//const wss = new WebSocket.Server({port:3000,
//				  host:"ws://192.168.50.126"
//});

const silence = new WebStreamerServer(server);

wss.on("connection", function(ws, req){
  ws.on('message', function incoming(message){
    var coordinates = JSON.parse(message);
    var y = Number(coordinates.y)*200/(54*10)+500;
    var x = Number(coordinates.x)*200/(96*10)+1950;
    console.log(Math.round(x) + ", " + Math.round(y));	
    servoy.servoWrite(Math.round(y));
    servox.servoWrite(Math.round(x));
  });
}); 

wss.on('open', function(ws, req){
	ws.send("Connected to servo");
});
const port = 8081;
console.log("Listening on port " + port);
server.listen(port);

