from QueueClient import QueueClient

consumer = QueueClient('c')

consumer.connect()

consumer.listen()
