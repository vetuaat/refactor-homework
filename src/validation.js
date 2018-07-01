'use strict'

const {dateUtilities} = require('./dateUtilities');
const {WORKING_DAYS, WORKING_HOURS} = require('./scheduleConstants');

class validation {
  static checkInputs(date, turnaroundHours) {
    const validatedInputDate = this.isInputDateFormatValid(date);
    const validatedTurnaroundHours = this.isTurnaroundHoursValid(turnaroundHours);
    const validatedWorkingTimeSubmit = this.isInWorkingDay(date) && this.isInWorkingTime(date);
    if (this.isThereAnError([validatedInputDate, validatedTurnaroundHours, validatedWorkingTimeSubmit])) {
      const errorsObject = {
        error: true,
        validatedInputDate,
        validatedTurnaroundHours,
        validatedWorkingTimeSubmit,
      };
      return errorsObject;
    } else {
      return {
        error: false,
      };
    }
  }

  static isInputDateFormatValid(inputDate) {
    const regexpForInputTimestamp = /^\d{4}-(((0[13578]|(10|12))-(0[1-9]|[1-2]\d|3[0-1]))|(02-(0[1-9]|[1-2]\d))|((0[469]|11)-(0[1-9]|[1-2]\d|30)))\s([0-1]\d|2[0-3]):[0-5]\d$/;
    if (inputDate.match(regexpForInputTimestamp)) {
      return true;
    }
    return false;
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
    const UTCTimestamp = dateUtilities.createUTCTimestamp(date);
    const submitTime = UTCTimestamp.toUTCString().split(' ')[4];
    const submitTimeInSeconds = dateUtilities.getSecondsFromHMS(submitTime);
    const startHourInSeconds = dateUtilities.getSecondsFromHMS(WORKING_HOURS.startHour);
    const endHourInSeconds = dateUtilities.getSecondsFromHMS(WORKING_HOURS.endHour);
    const afterStartHour = submitTimeInSeconds >= startHourInSeconds;
    const beforeEndHour = submitTimeInSeconds <= endHourInSeconds;

    return afterStartHour && beforeEndHour;
  }

  static isThereAnError(validations) {
    const isThereAnyNotValid = validations.some((validation) => validation === false)
    return isThereAnyNotValid;
  }

  static getFormattedErrorMessages(errors) {
    return errors.validatedInputDate
    ? errors.validatedTurnaroundHours
    ? errors.validatedWorkingTimeSubmit
    ? 'There was an unexpected error'
    : 'Please only submit bugs in working hours'
    : 'Turnaround time must be greater than 0'
    : 'Please check your input and use the YYYY-MM-DD HH:MM format';
  }



};

module.exports = {validation};
