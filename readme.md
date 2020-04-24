# Instructions

I've developed this on a mac. These instructions assume you are using a UNIX based system.

I've included relatively detailed commit messages demonstrating my thinking.

I've used [RabbitMQ](https://www.rabbitmq.com/) as my message broker, and paho MQTT as the MQTT client library for both the [python](https://pypi.org/project/paho-mqtt/) and [javascript](https://www.eclipse.org/paho/clients/js/) components of this project.

I have broken the python component of this project down into a `QueueClient` class and two scripts, `Procuder.py` and `Consumer.py`.

The random number generator is included in the publish method on the `QueueClient` class. If it was any more complex than one line I would have put it in a separate file and imported it in (to promote modularity) but thought that was overkill in this case.

## Setup

TODO: include info about rabbitmq setup

## To start the application

From the root of this project run `start.sh`. It should already have the correct permissions, however if it does not run `chmod +x start.sh`.

This will start the both the `Procuder.py` and `Consumer.py` scripts as background processes. You will see the output of `Consumer.py` (namely the random number read from the MQTT topic in the message broker)

This means you will not be able to stop the process with `<CTRL C>`as normal. To stop these processes find their process id with `ps | grep -E "(Producer|Consumer).py"` and use the `kill` command to terminate them.

### Web Application

To test the web application all you need to do is open the file `./web-app/index.html` in your browser of choice while the python applications are running.
