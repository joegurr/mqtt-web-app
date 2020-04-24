const wsbroker = "127.0.0.1"; // mqtt websocket enabled broker
const wsport = 15675;
const client = new Paho.MQTT.Client(
  wsbroker,
  wsport,
  "/ws",
  "myclientid_" + parseInt(Math.random() * 100, 10)
);

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({ onSuccess: onConnect });

// called when the client connects
function onConnect() {
  // Once a connection has been made make a subscription
  console.log("Connected ");
  client.subscribe("rand");
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("Connection Lost: " + responseObject.errorMessage);
  }
}

// called when a message arrives
function onMessageArrived(message) {
  let input = message.payloadString;

  processMessage(input);
  console.log("Message arrived: " + input);
}

function processMessage(input) {
  // checks if the message is indeed a number
  if (!isNaN(input)) {
    // updates the displayed number
    $("#rand").html(`<h1>${input}</h1>`);
    $("#solar").animate({ width: newWidth(input) }, 1000);
  } else {
    $("#rand").html(`<h1>Error! Expected a number.</h1>`);
  }
}

// arbitrary scale, I just decided that this one looked best
function newWidth(inputNumber) {
  return 400 + 4 * inputNumber;
}
