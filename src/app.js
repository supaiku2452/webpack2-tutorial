import moment from 'moment';

const vendor = require('./vendor');

var rightNow = moment().format('MMMM Do YYYY, h:mm:ss a');
console.log(rightNow);
