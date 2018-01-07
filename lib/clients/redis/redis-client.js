const redis = require('redis'),
      redisClient = redis.createClient();

// TODO: Creating server connection with settings
function load(settings) {

  redisClient.on('error', (err) => {
    console.log('REDIS error from server --> ', err);
  });

  return {
    start: function() {
      redisClient.on('connect', () => {
	    console.log('REDIS is connected');
      return redisClient;
	  });
    }
  }
}

module.exports.load = load;