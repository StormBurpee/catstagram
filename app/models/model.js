exports.Model = class {
    constructor(rClient) {
      this.rClient = rClient;
    }

    saveModel(key, model) {
      this.rClient.hmset(key, model);
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
