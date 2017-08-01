var { Model } = require('../model.js');

exports.User = class extends Model {

  constructor(email, username, password) {
    this.email = email;
    this.username = username;
    this.password = password;
  }

  saveModel() {

  }

  deleteModel() {

  }

}
