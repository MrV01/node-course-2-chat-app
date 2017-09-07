
// Timestamps , and time format.  Moment.js
// In JS timestamps are in  milliseconds.
/// Jan 1st 1970 00:00:01am = 1000 in JS milliseconds.
/// Dec 31 1969 11:59:59pm  = -1000 in JS milliseconds or -1 in UNIX seconds.
/// Jan 1st 1970 00:00:10 am = 10,000 in JS milliseconds.

var tim1 = new Date();
console.log('getTime', tim1.getTime());
console.log('getMonth',tim1.getMonth());
var months = ['Jan', 'Feb', 'Mar'];

//
// To resolve time - related issues we will use "moment" - TO GO library to process the time.
// npm i moment@2.18.1 --save   ( in the   node-chat-app directory )
//  it installs the library into Heroku deployment  and locally.
//
var moment = require('moment');

// http://momentjs.com/
// http://momentjs.com/docs/#/displaying/
var date = moment();
console.log(date.format());  // default
console.log(date.format('MMM'));  // shorthand version of the months
console.log(date.format('MMM YYYY'));  // shorthand version of the months
console.log(date.format('MMM Do, YYYY'));

// http://momentjs.com/docs/#/manipulating/
console.log(date.add(50,'year').subtract(9, 'months').format('MMM Do, YYYY'));

// 10:35 am   Format challenge exercise
//  6:01 am
console.log(date.format('h:mm a'));

var someTimestamp = moment().valueOf();
console.log(someTimestamp);

var createdAt = 1234;
var date = moment(createdAt);
console.log(date.format('h:mm a'));
