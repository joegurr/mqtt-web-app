import random, time
from datetime import datetime
import paho.mqtt.client as mqtt

class QueueClient:
    def __init__(self, client_id):
        self.client = mqtt.Client(client_id)
        self.client.on_connect = on_connect
        self.client.on_message = on_message
        self.client.on_publish = on_publish

    def connect(self, broker_address = '127.0.0.1'):
        self.client.connect(broker_address)

    def listen(self, topic = 'rand'):
        self.client.subscribe("rand")
        self.client.loop_forever()

    def publish(self, topic = 'rand', sleep_time = 1):
        while True:
            self.client.publish(topic, random.randint(1,101))
            time.sleep(sleep_time)

# The callback for when the client receives a CONNACK response from the server.
def on_connect(client, userdata, flags, rc):
    print("Connected with result code " + str(rc))

# The callback for when a PUBLISH message is received from the server.
def on_message(client, userdata, msg):
    print(str(msg.payload.decode("utf-8")) + " [" + str(datetime.now()) + "]")

# The callback for when a PUBLISH message is sent from a client
def on_publish(client, userdata, mid):
    print("Published successfully " + str(mid))
