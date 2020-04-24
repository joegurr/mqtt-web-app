const wsbroker = "127.0.0.1"; // mqtt websocket enabled broker
const wsport = 15675;
const client = new Paho.MQTT.Client(
  wsbroker,
  wsport,
  "/ws",
  "myclientid_" + parseInt(Math.random() * 100, 10)
);

/**
 * ### Callback functions ###
 */

// called when the client connects
const onConnect = () => {
  console.log("Connected"); // Once a connection has been made make a subscription
  client.subscribe("rand");
};

// called when the client loses its connection
const onConnectionLost = (responseObject) => {
  if (responseObject.errorCode !== 0) {
    console.log("Connection Lost: " + responseObject.errorMessage);
  }
};

// called when a message arrives
const onMessageArrived = (message) => {
  let input = message.payloadString;
  processMessage(input);
  console.log("Message arrived: " + input);
};

/**
 * ### Helper functions ###
 */

const processMessage = (input) => {
  let updatedField = "<h1>Error! Expected a number.</h1>";
  // checks if the message is indeed a number
  if (!isNaN(input)) {
    updatedField = `<h1>${input}</h1>`;
    //animates the solar panels
    $("#solar").animate({ width: newWidth(input) }, 1000);
  }
  // updates the displayed number
  $("#rand").html(updatedField);
};

// arbitrary scale, I just decided that this one looked best
const newWidth = (inputNumber) => 400 + 4 * inputNumber;

/**
 * ### Start the MQTT Client ###
 */

// set callback handlers
client.onConnectionLost = onConnectionLost.bind(this);
client.onMessageArrived = onMessageArrived.bind(this);

// connect the client
client.connect({ onSuccess: onConnect.bind(this) });
