'use strict';

class dateUtilities {

  static convertHoursToMS(hours) {
    return parseInt(hours * 3600000);
  }

  static convertMinutesToMS(minutes) {
    return parseInt(minutes * 60000);
  }

  static getCurrentDayName(date) {
    return date.toLocaleDateString('en-EN', {weekday: 'long'});
  }

  static getFullDayWorkHours(startHour, endHour) {
    return endHour - startHour;
  }

  static getFormattedUTCDate(date) {
    const dateArray = date.toUTCString().split(' ');
    const dayOfMonth = dateArray[2];
    const month = dateArray[1];
    const hourWithMinute = dateArray[4].split(':');
    hourWithMinute.splice(2);
    return `${dayOfMonth} ${month} ${hourWithMinute.join(':')}`;
  }
}

module.exports = {dateUtilities};
