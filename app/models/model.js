var redis = require('redis');
class Model {
    constructor(rClient) {
      this.rClient = rClient;
    }

    saveModel(key, model) {
      console.log("creating model " + key);
      this.rClient.hmset(key, model);
    }

    deleteModel(key) {
      
    }

    checkIfModelExists(key) {
      return new Promise((resolve, reject) => {
        this.rClient.hgetall(key, function(err, reply){
          resolve(reply);
        });
      });
    }

    findModel(key) {
      return new Promise((resolve, reject) => {
        this.checkIfModelExists(key).then(function(resp) {
          resolve( resp );
        });
      });
    }
}

module.exports = Model;
