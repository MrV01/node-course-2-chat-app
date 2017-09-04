//   Run test suite:   npm run test-watch
///
var expect =  require('expect');

var { generateMessage } = require('./message') ;

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
