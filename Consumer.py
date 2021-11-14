from QueueClient import QueueClient


def main():
    consumer = QueueClient("c")

    consumer.connect()

    consumer.listen()


if __name__ == "__main__":
    main()
