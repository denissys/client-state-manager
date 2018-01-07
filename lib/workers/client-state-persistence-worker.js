'use strict'

// TODO: Expost to redis-client.js (default redis config)
const redis = require('redis'),
      redisClient = redis.createClient(),
      dateFormat = require('dateformat');;

/**
 * This worker is represented to a DSL to execute the process of read and persist messages.
 *
 * param settings: required to set basic settings
 * param mqttServerBroker: required to read mqtt messages
 */
function load(settings, mqttServerBroker) {

	return {
		execute: async function () {
			console.log('Starting process to subscribe on MQTT topic ['+ settings.mqtt.topic +']')
			WorkerHealth.checkStatus(30000);

            let qosConfig = { 'retain': settings.mqtt.qos.retain, 'qos': settings.mqtt.qos.level };
			mqttServerBroker.subscribe(settings.mqtt.topic, qosConfig);
			
			mqttServerBroker.on('message', function(topic, message) {
				let clientData = JSON.parse(message.toString());
				let key = ClientKey.get(clientData);
				redisClient.hincrby(key, 'hit', 1, function(){}); // Hits of keepAlive per hour
				redisClient.hset(key, 'lastHitTS', clientData.ts, function(){}); // Last hit in timestamp
			});
		}
     };
}

let ClientKey = {

	get: function(clientData) {
		let keyInitials = clientData.name + '-' + clientData.id;
		let keyVariant = dateFormat(new Date(clientData.ts), "yyyymmdd-HH");
		return keyInitials + '-' + keyVariant;
	}
}

let WorkerHealth = {

	getMessage: function() {
		console.log('The [client-state-persistence-worker] is live at: ' + new Date());
	},
	checkStatus: function(timeIntervalInMS) {
		setInterval(this.getMessage, timeIntervalInMS);
	}
}

module.exports.load = load;