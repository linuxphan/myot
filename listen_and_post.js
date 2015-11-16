var mqtt = require('mqtt'), url = require('url');
// Parse
var mqtt_url = url.parse(process.env.CLOUDMQTT_URL || 'mqtt://localhost:1883');
var auth = (mqtt_url.auth || ':').split(':');

var ThingSpeakClient = require('thingspeakclient');
var tsclient = new ThingSpeakClient();

//my ThingSpeakClient API
var channelId = 54225;
var apiKey = 'P0PR3PJ0OBJON35Q';



//CloudMQTT client config
var mqclient = mqtt.createClient(mqtt_url.port, mqtt_url.hostname, {
  username: auth[0],
  password: auth[1]
});

//Attach to ThingSpeak Channel
tsclient.attachChannel(channelId, { writeKey:apiKey});

//Subscribe to a topic and post payload to ThingSpeak
mqclient.on('connect', function() {
  mqclient.subscribe('/basestation', function() {

//tsData = { field1: demand };
//            tsclient.updateChannel(channelId,tsData);

    // when a message arrives, do something with it
    mqclient.on('message', function(topic, message, packet) {
      var payload = message.toString();
      var tsData = new Object();
      tsData = { field1: payload };
    console.log('We can see 1: ' +payload );
      tsclient.updateChannel(54225, tsData, function(err, resp) {
          if (!err && resp > 0) {
              console.log('update successfully. Entry number was: ' + resp);
          }
        });
    });
  });
});
