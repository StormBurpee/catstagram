var { Model } = require('../model.js');

exports.User = class extends Model {

  constructor(rClient, email, username, password) {
    super(rClient);
    this.email = email;
    this.username = username;
    this.password = password;
    this.saveUser();
  }

  constructor(rClient) {
    super(rClient);
  }

  saveUser() {
    if(this.checkIfModelExists("user:"+this.username)) {
      //TODO: Hash password, rather than storing in plain text. Alternatively store password in seperate database, so that password doesn't get returned with User lookup
      this.saveModel("user:"+this.username, {
        "username": this.username,
        "email": this.email,
        "password": this.password
      });
    }
    return 0; //Username taken
  }

  deleteModel() {

  }

  findUser(rClient, username) {
    super(rClient);
    let user = this.findModel("user:"+username);
    if(user != 0) {
      this.email = user.email;
      this.username = user.username;
      return this;
    }
    return 0;
  }

}
