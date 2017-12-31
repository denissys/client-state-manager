'use strict'

/**
 * This worker is represented to a DSL to execute the process of read and persist messages.
 *
 * param settings: required to set basic settings
 * param mqttServerBroker: required to read mqtt messages
 */
function load(settings, mqttServerBroker) {

	return {
		execute: function () { 
            var qosConfig = { 'retain': settings.mqtt.qos.retain, 'qos': settings.mqtt.qos.level };

			mqttServerBroker.subscribe(settings.mqtt.topic, qosConfig);
			mqttServerBroker.on('message', function(topic, message) {
				console.log(message.toString());
			});
		}
     };
}

module.exports.load = load;