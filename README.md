# Simple MQTT Web App

This is an altered version of a technical test I completed as part of an interview process.

The premise was that I needed to demonstrate my ability to learn new concepts, and implement both a front and a back end of a simple system. This project was written in python, this was my first time using python.

The system requires a random number to be published over the [MQTT](https://mqtt.org/) protocol. MQTT is a publish-subscribe messaging framework. For this test two consumers were required. One was a web application, that would resize an SVG in response to the magnitude of the published number. The other was a command line application that would print the published output to the terminal.

I broke the python component of this project down into a `QueueClient` class and two scripts, `Producer.py` and `Consumer.py`.

The random number generator is included in the publish method on the `QueueClient` class. If it was any more complex than one line I would have put it in a separate file and imported it in but thought that was overkill in this case.

I've included relatively detailed commit messages demonstrating my thinking.

I've used [RabbitMQ](https://www.rabbitmq.com/) as my message broker, and paho MQTT as the MQTT client library for both the [python](https://pypi.org/project/paho-mqtt/) and [javascript](https://www.eclipse.org/paho/clients/js/) components of this project.

## Setup

These following instructions assume you are using a UNIX based system.

I am running a local instance of rabbitmq for this project. To set one up for yourself install rabbitmq. For debian users: `sudo apt install rabbitmq-server`. Then we need to enable a few plugins via `rabbitmq-plugins enable rabbitmq_mqtt rabbitmq_web_mqtt`.

To start rabbitmq use the command `rabbitmq-server` and stop the process with `<CTRL C>`.

## To start the application

Once you have your rabbitmq process running, from the root of this project run `start.sh`. It should already have the correct permissions, however if it does not run `chmod +x start.sh`.

This will start the both the `Producer.py` and `Consumer.py` scripts as background processes. You will see the output of `Consumer.py` (namely the random number read from the MQTT topic in the message broker)

This means you will not be able to stop the process with `<CTRL C>`as normal. To stop these processes find their process id with `ps | grep -E "(Producer|Consumer).py"` and use the `kill` command to terminate them.

### Web Application

To test the web application all you need to do is open the file `./web-app/index.html` in your browser of choice while the python applications are running.
