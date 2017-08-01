var Model         = require('../model');
var passwordHash  = require('password-hash');

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

  verifyPassword() {
    return new Promise((resolve, reject) => {
      let user = this;
      this.rClient.hgetallAsync("userpassword:"+this.username).then(res => {
        resolve(passwordHash.verify(user.password, res.password));
      });
    });
  }

  login(username, password) {
    //TODO: Set cookies etc proving you're logged in
    //      Alternatively, using redis create a unique identifier, to help with login cookies.
    return new Promise((resolve, reject) => {
      let user = this;
      this.username = username;
      this.password = password;
      this.checkIfModelExists("user:"+this.username).then(function(resp) {
        if(resp != null) {
          user.verifyPassword().then(resp => {
            if(resp == true) {
              resolve(1); // password correct
            } else {
              resolve(-1); // password incorrect;
            }
          });
        } else {
            resolve (0);
        }
      });
    });
  }

  deleteUser() {
    this.deleteModel("user:"+this.username);
  }

  registerUser(email, username, password) {
    this.email = email;
    this.username = username;
    this.password = passwordHash.generate(password);
    return this.saveUser();
  }

  findUser(username) {
    return new Promise((resolve, reject) => {
      let thisUser = this;
      this.findModel("user:"+username).then(function(response){
        let user = response;
        if(user != 0) {
          thisUser.email = user.email;
          thisUser.username = user.username;
          resolve( user );
        }
      });
    });
  }

}

module.exports = User;
