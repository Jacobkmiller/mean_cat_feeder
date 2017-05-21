import RPi.GPIO as gpio
gpio.setmode(gpio.BCM)
gpio.setup(4, gpio.OUT)
gpio.output(4, gpio.HIGH)
