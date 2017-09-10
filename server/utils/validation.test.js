///
// Test case(s) for validation functions.
///
const expect = require('expect');

// Test case .  isRealString()
const {isRealString} = require('./validation.js');

describe('Is Real String ', () => {      //isRealString()
  // should reject non-string values (syncronous)
    it('should reject non-string values ', () => {
      expect( isRealString(1) ).toBeFalsy();
      expect( isRealString(true) ).toBeFalsy();
      expect( isRealString(null) ).toBeFalsy();
    });
    // should reject string with only spaces (syncronous)
    it('should reject string with only spaces ', () => {
      expect( isRealString('') ).toBeFalsy();
      expect( isRealString('       ') ).toBeFalsy();
      expect( isRealString('          ') ).toBeFalsy();
    });
    // should allow string with non-space characters.(syncronous)
    it('should allow string with non-space characters ', () => {
      expect( isRealString('46        ') ).toBeTruthy();
      expect( isRealString('       Developers') ).toBeTruthy();
      expect( isRealString('Press    Room') ).toBeTruthy();
      expect( isRealString('Room') ).toBeTruthy();
    });

});
