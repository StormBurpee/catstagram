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
    return new Promise((resolve, reject) => {
      let user = this;
      this.checkIfModelExists("user:"+this.username).then(function(resp){
        console.log(resp);
        if(resp == null) {
          //TODO: Hash password, rather than storing in plain text. Alternatively store password in seperate database, so that password doesn't get returned with User lookup
          user.saveModel("user:"+user.username, {
            "username": user.username,
            "email": user.email
          });
          user.saveModel("userpassword:"+user.username, {
            "password": user.password
          });
          resolve( 1 );
        }''
        resolve( 0 );
      });
    });
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
    return new Promise((resolve, reject) => {
      this.findModel("user:"+username).then(function(response){
        let user = response;
        if(user != 0) {
          /*this.email = user.email;
          this.username = user.username;*/
          console.log(user);
          resolve( user );
        }
      });
    });
  }

}

module.exports = User;
