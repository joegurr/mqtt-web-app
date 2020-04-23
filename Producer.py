from QueueClient import QueueClient

producer = QueueClient('p')

producer.connect()

producer.publish()
