from flask import Flask
import RPi.GPIO as gpio

app = Flask(__name__)
gpio.setmode(gpio.BCM)
gpio.setup(4, gpio.OUT)
@app.route('/on')
def on():
	gpio.output(4, gpio.HIGH)

@app.route('/off')
def off():
	gpio.output(4, gpio.LOW)
