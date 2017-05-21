from flask import Flask, make_response
import RPi.GPIO as gpio

app = Flask(__name__)
gpio.setmode(gpio.BCM)
gpio.setup(4, gpio.OUT)
#gpio.output(4,gpio.HIGH)

@app.route('/on', methods=["POST"])
def on():
	gpio.output(4, gpio.HIGH)
	resp = make_response('{"response": "on"}')
	resp.headers['Content-Type'] = "application/json"
	return resp

@app.route('/off', methods=["POST"])
def off():
	gpio.output(4, gpio.LOW)
	resp = make_response('{"response": "off"}')
	resp.headers['Content-Type'] = "application/json"
	return resp

if __name__=="__main__":
#    app.run()
    app.run(host="0.0.0.0", debug=True)

