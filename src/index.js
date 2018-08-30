'use strict';

const {WORKING_DAYS, WORKING_HOURS} = require('./scheduleConstants');
const {dateUtilities} = require('./dateUtilities');
const {validation} = require('./validation/validation');

class dueDateProgram {
  static calculateDueDate(submitDate, turnaroundHour = 1) {
    try {
      validation.checkInputs(submitDate, turnaroundHour);
      const dueDate = this.dueDateCalculator(submitDate, turnaroundHour);
      return `Due date: ${dateUtilities.getFormattedUTCDate(dueDate)}`;
    } catch (error) {
      return error;
    }
  }

  static dueDateCalculator(startDate, turnaroundHour) {
    const timeLeftToWork = this.calculateTimeLeftToWork(turnaroundHour);
    const dueDate = this.getResolveDate(startDate, timeLeftToWork);
    return new Date(dueDate);
  }

  static calculateTimeLeftToWork(hours) {
    const fullDayWorkHours = dateUtilities.getFullDayWorkHours(
      WORKING_HOURS.startHour,
      WORKING_HOURS.endHour
    );
    let daysToWork = Math.floor(hours / fullDayWorkHours);
    let hoursToWork = hours - daysToWork * fullDayWorkHours;
    const isThereFullDayWork = daysToWork > 0 && hoursToWork === 0;
    if (isThereFullDayWork) {
      daysToWork -= 1;
      hoursToWork += fullDayWorkHours;
    }
    const calculatedTimes = {
      daysToWork,
      hoursToWork,
    };
    return calculatedTimes;
  }

  static getResolveDate(startDate, timeLeft) {
    const cloneStartDate = new Date(startDate);
    const timestampWithAddedWorkDays = this.addWorkDays(
      cloneStartDate,
      timeLeft.daysToWork
    );
    const timestampWithAddedWorkDaysAndHours = this.addWorkHours(
      cloneStartDate,
      timeLeft.hoursToWork
    );
    const finalResolveDate = this.calculateOverflowingDay(
      timestampWithAddedWorkDaysAndHours
    );

    return finalResolveDate;
  }

  static addWorkDays(startDate, daysToWork) {
    const SATURDAY_JS = 6;
    const FRIDAY_JS = 5;
    const WEEKEND_DAYS = 2;
    const currentDay = startDate.getDay();
    let daysToAdd = daysToWork;
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
    const newDateAfterWorkDays = new Date(
      startDate.setDate(startDate.getDate() + daysToAdd)
    );
    return newDateAfterWorkDays;
  }

  static addWorkHours(currentDate, hoursToWork) {
    const addedHours = currentDate.setUTCHours(
      currentDate.getUTCHours() + hoursToWork
    );
    return new Date(addedHours);
  }

  static calculateOverflowingDay(timestamp) {
    const workingDayEndHour = parseInt(WORKING_HOURS.endHour.split(':')[0]);
    const workingDayEndMinutes = parseInt(WORKING_HOURS.endHour.split(':')[1]);
    const workingDayStartHour = parseInt(WORKING_HOURS.startHour.split(':')[0]);
    const hoursAfterAddedWork = timestamp.getUTCHours();
    const minutesAfterAddedWork = timestamp.getUTCMinutes();

    const afterWorkTime =
      hoursAfterAddedWork > workingDayEndHour ||
      (hoursAfterAddedWork === workingDayEndHour &&
        minutesAfterAddedWork > workingDayEndMinutes);
    if (afterWorkTime) {
      const addedExtraDay = this.addWorkDays(timestamp, 1);
      const newDayAfterExtraDay = new Date(
        addedExtraDay.setUTCHours(workingDayStartHour)
      );
      const remainingHours = hoursAfterAddedWork - workingDayEndHour;
      const newDateWithOverflowingDay = this.addWorkHours(
        newDayAfterExtraDay,
        remainingHours
      );
      return newDateWithOverflowingDay;
    }
    return timestamp;
  }
}

module.exports = dueDateProgram;
