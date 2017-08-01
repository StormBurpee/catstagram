var redis = require('redis');
class Model {
    constructor(rClient) {
      this.rClient = rClient;
    }

    saveModel(key, model) {
      console.log("creating model " + key);
      this.rClient.hmset(key, model, function(err, response) {
        console.log(response, {error: err});
      });
      console.log(this.rClient.server_info);
    }
    deleteModel() {}

    checkIfModelExists(key) {
      this.rClient.exists(key, function(err, reply) {
        return reply;
      });
      return 0;
    }

    findModel(key) {
      if(this.checkIfModelExists(key)) {
        this.rClient.hgetall(key, function(error, reply) {
          return reply;
        })
      }
      return 0; // Model doesn't exist.
    }
}

module.exports = Model;
