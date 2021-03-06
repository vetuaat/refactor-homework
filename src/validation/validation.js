'use strict';

const {dateUtilities} = require('../dateUtilities');
const {WORKING_DAYS, WORKING_HOURS} = require('../scheduleConstants');
const {
  inputFormatError,
  overWorkHoursError,
  turnaroundTimeError,
} = require('./customErrors');

class validation {
  static checkInputs(date, turnaroundHours) {
    if (this.isInputDateFormatValid(date)) {
      if (this.isInWorkingDay(date) && this.isInWorkingTime(date)) {
        if (this.isTurnaroundHoursValid(turnaroundHours)) {
          return true;
        }
        throw new turnaroundTimeError();
      }
      throw new overWorkHoursError();
    }
    throw new inputFormatError();
  }

  static isInputDateFormatValid(inputDate) {
    return (inputDate instanceof Date);
  }

  static isTurnaroundHoursValid(turnaroundHours) {
    return turnaroundHours > 0;
  }

  static isInWorkingDay(date) {
    const nameOfTheCurrentDay = dateUtilities.getCurrentDayName(date);
    const isInWorkingDay = WORKING_DAYS.indexOf(nameOfTheCurrentDay) !== -1;
    return isInWorkingDay;
  }

  static isInWorkingTime(date) {
    const submitTime = date.getUTCHours();
    const afterStartHour = submitTime >= WORKING_HOURS.startHour;
    const beforeEndHour = submitTime < WORKING_HOURS.endHour;
    return afterStartHour && beforeEndHour;
  }
}

module.exports = {validation};
