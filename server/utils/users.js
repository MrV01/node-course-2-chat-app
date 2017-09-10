
// data  structure : SocketIO sessionID,  user name, room name
// [{
//   id: '/#12poireuwirui',
//   name: 'Vlad',
//   room: 'A room'
// }]
//// Possible implementation:
/// var users = [];
///// Methods:
///addUser(id, name, room)
/// removeUser(id)
/// getUser(id)
/// getUserList(room)

///  ES6 classes are used instead of array and 4 functions.

class  Users {
  constructor() {    // deafault one , runs by  "new Users()"
      this.users = [];
  }

  addUser (id, name, room) {
    var user = {id, name, room} ;
    this.users.push(user);
    return user;
  }

  removeUser (id ) {
    // return user that was removed
    var rUser = this.users.filter((user) =>  user.id === id)[0];
    if (rUser) {
      this.users = this.users.filter((user) =>  user.id !== id);
    }
    return rUser;
  }

  getUser (id) {
     return this.users.filter((user) =>  user.id === id)[0];
  }

  getUserList (room) {
      var  users = this.users.filter((user) => user.room === room );
      var namesArray = users.map((user) => user.name);
      return namesArray;
  }

}  //// end of class Users

module.exports = {Users};

// class Person {
//     constructor (name, age) {  // called by default
//       this.name = name;
//       this.age = age;
//       console.log(name, age );
//     }
//     getuserDescription () {
//       return `${this.name} is ${this.age} year(s) Old`;
//     }
// }
//
// var me = new Person('Vlad', 52);
// console.log('this.name: ', me.name);
// console.log('this.age :', me.age);
// var description = me.getuserDescription();
// console.log(description);
