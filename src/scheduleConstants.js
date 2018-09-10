'use strict'

const startTime = new Date();
const endTime = new Date();

startTime.setUTCHours(9,0,0);
endTime.setUTCHours(17,0,0);


const WORKING_HOURS = {
  startHour: startTime.getUTCHours(),
  endHour: endTime.getUTCHours(),
  startMinutes: startTime.getUTCMinutes(),
  endMinutes: endTime.getUTCMinutes(),
};


const WORKING_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

module.exports = {WORKING_HOURS, WORKING_DAYS}