'use strict'

var settings = require('./lib/util/settings.js').load('default').read();
var mqttServerBroker = require("./lib/server/mqtt/server.js").load(settings).start();
var posStatePersistenceWorker = require("./lib/worker/pos-state-persistence-worker.js").load(settings, mqttServerBroker).execute();