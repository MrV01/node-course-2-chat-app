//
// Test suite for users.js
//

const expect = require('expect') ;
const {Users} = require('./users') ;

describe ('Users', () => {
  var users;
  /// Seeding some data for a testing . Before each test.
  beforeEach(() => {
        users = new Users();
        users.users = [{
          id: '1',
          name: 'Mike',
          room: 'Node Course'
        }, {
          id: '2',
          name: 'Jen',
          room: 'React Course'
        }, {
          id: '3',
          name: 'Julie',
          room: 'Node Course'
        }
      ];
  });  // end of beforeEach

  it('should add new user', (/* No "done" callback required, syncronus test */) => {
      // Ignore seeds data in this particular case
      var users = new Users();
      var user = {
        id: '123',
        name: 'Vlad',
        room: 'The Office Fans'
      };

      var resUser = users.addUser(user.id, user.name, user.room) ;
      expect(users.users).toEqual([user]);
  });  // end of it

  it('should remove user', (/* No "done" callback required, syncronus test */) => {
      // Using "beforeEach" seed data
      var rUser =  users.removeUser('2');
      expect(rUser).toEqual( {
        id: '2',
        name: 'Jen',
        room: 'React Course'
      });

       expect(users.users).toEqual ( [
        {
         id: '1',
         name: 'Mike',
         room: 'Node Course'
       }, {
         id: '3',
         name: 'Julie',
         room: 'Node Course'
       }
      ] );

  });  //end of it

  it('should not remove user', (/* No "done" callback required, syncronus test */) => {
      // Using "beforeEach" seed data
      var  rUser =  users.removeUser('2334');
      expect( rUser).toEqual( undefined );
      expect(users.users).toEqual (users.users);

  });  //end of it

  it('should find user', (/* No "done" callback required, syncronus test */) => {
      // Using "beforeEach" seed data
      var user =  users.getUser('3');
      expect(user).toEqual({
        id: '3',
        name: 'Julie',
        room: 'Node Course'
      });
      expect(users.users).toEqual (users.users);
  });  //end of it

  it('should not find user', (/* No "done" callback required, syncronus test */) => {
      // Using "beforeEach" seed data
      var user =  users.getUser('33456');
      expect(user).toEqual(undefined);
      expect(users.users).toEqual (users.users);
  });  //end of it


  it('should return names for Node Course', (/* No "done" callback required, syncronus test */) => {
      // Using "beforeEach" seed data
      var userList =  users.getUserList('Node Course');
      expect(userList).toEqual( [ 'Mike', 'Julie']);
  });  //end of it

  it('should return names for React Course', (/* No "done" callback required, syncronus test */) => {
      // Using "beforeEach" seed data
      var userList =  users.getUserList('React Course');
      expect(userList).toEqual( [ 'Jen']);
  });  //end of it



});
