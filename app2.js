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
const gpio = require('pigpio').Gpio;

var light = gpio(4);
var servo = gpio(17);
var pulsewidth = 1500;
var i = 200;
servo.mode(gpio.OUTPUT);
light.mode(gpio.OUTPUT);

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

app.get('/spin', function(req, res){
  servo.servoWrite(pulsewidth);
  pulsewidth += i;

  if (pulsewidth >= 2000) {
    i = -i;
  } else if (pulsewidth <= 1000) {
    i = -i;
  }
});


const server  = http.createServer(app);
const silence = new WebStreamerServer(server);

const port = 8081;
console.log("Listening on port " + port);
server.listen(port);

