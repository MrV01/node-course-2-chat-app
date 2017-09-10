//
// Validation of the user name, caht room, and other strings, params, etc.
//

var isRealString = (str) => {
  return typeof str === 'string' && str.trim().length > 0;
};

module.exports = { isRealString};
