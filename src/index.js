'use strict';

const {WORKING_HOURS} = require('./scheduleConstants');
const {dateUtilities} = require('./dateUtilities');
const {validation} = require('./validation/validation');

class dueDateProgram {
  static calculateDueDate(submitDate, turnaroundHour = 1) {
    try {
      validation.checkInputs(submitDate, turnaroundHour);
      const dueDate = this._dueDateCalculator(submitDate, turnaroundHour);
      return `Due date: ${dateUtilities.getFormattedUTCDate(dueDate)}`;
    } catch (error) {
      return error;
    }
  }

  static _dueDateCalculator(startDate, turnaroundHour) {

    let calculatedDate = dateUtilities.newUTCDate(startDate);
    let remainingTimeMinutes = dateUtilities.convertHoursToMinutes(turnaroundHour);


    while (this._notInTheSameDay(calculatedDate, remainingTimeMinutes)) {
      remainingTimeMinutes -= (dateUtilities.convertHoursToMinutes(WORKING_HOURS.endHour - calculatedDate.getUTCHours())) - calculatedDate.getUTCMinutes();
      this._addWorkDay(calculatedDate);
    }
    const dueDate = calculatedDate.setUTCMinutes(remainingTimeMinutes);
    return dateUtilities.newUTCDate(dueDate);
  }


  static _notInTheSameDay(startDate, remainingTimeMinutes) {
    const convertHoursMinutes = dateUtilities.convertHoursToMinutes;

    const workTimeframe = (dateUtilities.convertHoursToMinutes(WORKING_HOURS.endHour - startDate.getUTCHours())) - startDate.getUTCMinutes();
    return workTimeframe < remainingTimeMinutes;

  }

  static _addWorkDay(startDate, addDays = 1) {
    const SATURDAY_JS = 6;
    const FRIDAY_JS = 5;
    const WEEKEND_DAYS = 2;
    const currentDay = startDate.getUTCDay();
    let daysToAdd = addDays;

    if (currentDay === 0) {
      daysToAdd++;
    }
    const weekend = currentDay + daysToAdd >= SATURDAY_JS;
    if (weekend) {
      const workDaysRemaining = daysToAdd - (FRIDAY_JS - currentDay);
      daysToAdd += WEEKEND_DAYS;
      if (workDaysRemaining > FRIDAY_JS) {
        daysToAdd += WEEKEND_DAYS * Math.floor(workDaysRemaining / FRIDAY_JS);
        if (workDaysRemaining % 5 == 0) {
          daysToAdd -= WEEKEND_DAYS;
        }
      }
    }
    startDate.setUTCDate(startDate.getUTCDate() + daysToAdd);
    startDate.setUTCHours(WORKING_HOURS.startHour, WORKING_HOURS.startMinutes);
  }
}

module.exports = dueDateProgram;
