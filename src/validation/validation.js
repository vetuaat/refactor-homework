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
    if (inputDate instanceof Date) {
      return true;
    }
    return false
  }

  static isTurnaroundHoursValid(turnaroundHours) {
    if (turnaroundHours > 0) {
      return true;
    }
    return false;
  }

  static isInWorkingDay(date) {
    const nameOfTheCurrentDay = dateUtilities.getCurrentDayName(date);
    const isInWorkingDay = WORKING_DAYS.indexOf(nameOfTheCurrentDay) !== -1;
    if (isInWorkingDay) {
      return true;
    }
    return false
  }

  static isInWorkingTime(date) {
    const submitTime = dateUtilities.convertHoursToMS(date.getUTCHours());
    const startHour = dateUtilities.convertHoursToMS(WORKING_HOURS.startHour.getUTCHours());
    const endHour = dateUtilities.convertHoursToMS(WORKING_HOURS.endHour.getUTCHours());
    const afterStartHour = submitTime >= startHour;
    const beforeEndHour = submitTime <= endHour;
    return afterStartHour && beforeEndHour;
  }
}

module.exports = {validation};
