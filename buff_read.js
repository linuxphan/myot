var mqtt = require('mqtt'), url = require('url');
// Parse
var mqtt_url = url.parse(process.env.CLOUDMQTT_URL || 'mqtt://localhost:1883');
var auth = (mqtt_url.auth || ':').split(':');


//New client connection
var client = mqtt.createClient(mqtt_url.port, mqtt_url.hostname, {
  username: auth[0],
  password: auth[1]
});
client.on('connect', function() {
  client.subscribe('/basestation', function() {
    // when a message arrives, do something with it
    client.on('message', function(topic, message, packet) {
      var payload = message.toString();
      var tsData = new Object();
      tsData = { field1: payload };
      console.log (tsData);
      console.log("Received '" + message + "' on '" + topic + "'");

    });
  });
});
