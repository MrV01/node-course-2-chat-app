//   Run test suite:   npm run test-watch
///
var expect =  require('expect');

var { generateMessage, generateLocationMessage } = require('./message') ;

/// Test(s) of   generateMessage
describe('generate message ', () => {

    it('should generate correct message object', () => {
       var from = "Bob"; var  text  = "Good Day!";
       // store result in variable
       var result =   generateMessage(from,text);
       // assert from match
      //  expect(result.from).toEqual(from);
       // assert text match
      //  expect(result.text).toEqual(text);
       // Instructor's solution:
       expect(result).toInclude({from, text}); // ES6 syntax
       // assert createdAt is number
       expect(result.createdAt).toBeA('number');
     });  // should generate correct message object
});

/// Test(s) of    generateLocationMessage
describe ('generate Location Message', () => {
      //  When it()  - no arguments it is SYNCRONOUS Test
      //  In case it(done)  -  argument is callback function  ASYNCRONOUS
      it('should generate correct location object' , () => {
          var from = 'Jeremy';
          var latitude = 123;
          var longitude = -20;
          var url = `https://www.google.com/maps?q=${latitude},${longitude}`;
          var message = generateLocationMessage(from, latitude, longitude);
          //  Assertions :
          expect(message.createdAt).toBeA('number');
          expect(message).toInclude({from, url});
      });
});
