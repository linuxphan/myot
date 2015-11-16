var ThingSpeakClient = require('thingspeakclient');
var client = new ThingSpeakClient();

//my ThingSpeakClient API
var channelId = 53803;
var apiKey = 'IV5FPY59DTKOFPHX';


client.attachChannel(channelId, { writeKey:apiKey});

client.updateChannel(53803, {field1: 72, field2: 65.8}, function(err, resp) {
    if (!err && resp > 0) {
        console.log('update successfully. Entry number was: ' + resp);
    }
  });
