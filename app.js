'use strict'

const settings = require('./lib/utils/settings.js').load('default').read(),
      mqttServerBroker = require('./lib/clients/mqtt/mqtt-server-broker.js').load(settings).start(),
      clientStatePersistenceWorker = require('./lib/workers/client-state-persistence-worker.js').load(settings, mqttServerBroker);

clientStatePersistenceWorker.execute();