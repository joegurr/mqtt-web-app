from QueueClient import QueueClient


def main():
    producer = QueueClient("p")

    producer.connect()

    producer.publish()


if __name__ == "__main__":
    main()
