var Model = require('../model');

class User extends Model {

  constructor(rClient) {
    super(rClient);
    this.rClient = rClient;
    this.email = "";
    this.username = "";
    this.password = "";
  }

  saveUser() {
    if(this.checkIfModelExists("user:"+this.username) != 1) {
      //TODO: Hash password, rather than storing in plain text. Alternatively store password in seperate database, so that password doesn't get returned with User lookup
      this.saveModel("user:"+this.username, {
        "username": this.username,
        "email": this.email,
        "password": this.password
      });
      return 1;
    }
    return 0; //Username taken
  }

  deleteModel() {

  }

  registerUser(email, username, password) {
    this.email = email;
    this.username = username;
    this.password = password;
    return this.saveUser();
  }

  findUser(username) {
    let user = this.findModel("user:"+username);
    if(user != 0) {
      this.email = user.email;
      this.username = user.username;
      return this;
    }
    return 0;
  }

}

module.exports = User;
