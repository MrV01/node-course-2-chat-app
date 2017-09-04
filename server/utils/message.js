//
// Store Utility functions related to Messages
//

var generateMessage = (from, text) => {
    return {
      from,
      text,
      createdAt: new Date().getTime()
    };
};

module.exports = { generateMessage };
