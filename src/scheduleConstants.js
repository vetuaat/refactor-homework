'use strict'

const startHour = new Date();
const endHour = new Date();

startHour.setUTCHours(9,0,0);
endHour.setUTCHours(17,0,0);


const WORKING_HOURS = {
  startHour,
  endHour,
};


const WORKING_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

module.exports = {WORKING_HOURS, WORKING_DAYS}