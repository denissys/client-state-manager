/* MQTT Server Processor */

'use strict'

console.log('+--------------------------+');
console.log('|    MQTT Server Broker    |');
console.log('+--------------------------+');

var mqtt = require("mqtt");

function load(settings) {

	var server = mqtt.connect(settings.mqtt.protocol + settings.mqtt.addrees, {
	  port: settings.mqtt.port
	});

	server.on("reconnect", function() {
	  console.log("MQTT server is reconnected");
	});

	server.on("error", function(err) {
	  console.log("MQTT error from server --> ", err);
	});

	server.on("close", function() {
	    console.log("MQTT server is closed");
	});

	server.on("offline", function(err) {
	  console.log("MQTT server is offline");
	});

	return {
		start: function() {
			server.on("connect", function() {
			  console.log("MQTT server is connected");
			});
			return server;
		}
		
	};
}

module.exports.load = load;