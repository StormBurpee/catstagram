var Model = require('../model');

class Cat extends Model {

  constructor(rClient) {
    super(rClient);
    this.username = "";
    this.owner = "";
    this.name = "";
    this.gender = 0; // 0 = female, 1 = male, 2 = other (People can be weird.)
    this.location = ""; //Frontend would use google api to search. Will create a wrapper for this api.
    this.birthday = "";
    this.about = "";
  }

  saveCat(owner, username, name, gender, location, birthday, about) {
    return new Promise((resolve, reject) => {
      let cat = this;
      this.checkIfModelExists("cat:"+this.username).then(resp => {
        if(resp == null) {
          cat.saveModel("cat:"+this.username, {
            "owner":      owner,
            "name":       name,
            "gender":     gender,
            "location":   location,
            "birthday":   birthday,
            "about":      about
          });
          cat.username = username;
          cat.owner = owner;
          cat.name = name;
          cat.gender = gender;
          cat.location = location;
          cat.birthday = birthday;
          cat.about = about;
          resolve(1); // Everything is okay!
        } else {
          resolve(0); // Username is taken
        }
      });
    });
  }

}

module.exports = Cat;
