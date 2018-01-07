/* MQTT Server Processor */

'use strict'

const mqtt = require('mqtt');

function load(settings) {

	let server = mqtt.connect(settings.mqtt.protocol + settings.mqtt.addrees, {
	  port: settings.mqtt.port
	});

	server.on('reconnect', function() {
	  console.log('MQTT is reconnected');
	});

	server.on('error', function(err) {
	  console.log('MQTT error from server --> ', err);
	});

	server.on('close', function() {
	    console.log('MQTT is closed');
	});

	server.on('offline', function(err) {
	  console.log('MQTT server is offline');
	});

	return {
		start: function() {
			server.on('connect', function() {
			  console.log('MQTT is connected');
			});
			return server;
		}
		
	};
}

module.exports.load = load;