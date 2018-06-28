'use strict';

class dateUtilities {
  static getCurrentDayName(dateStr) {
    const date = this.createUTCTimestamp(dateStr);
    return date.toLocaleDateString('en-EN', {weekday: 'long'});
  }

  static createUTCTimestamp(date) {
    return new Date(`${date.replace(' ', 'T')}Z`);
  }

  static getFullDayWorkHours(startHour, endHour) {
    const workDayInSeconds =
      this.getSecondsFromHMS(endHour) - this.getSecondsFromHMS(startHour);
    const fullDayWorkHour = workDayInSeconds / (60 * 60);
    return fullDayWorkHour;
  }

  static getSecondsFromHMS(stringHMS) {
    let hmsArray = stringHMS.split(':');
    let seconds = 0;
    let minutes = 1;
    while (hmsArray.length > 0) {
      seconds += minutes * parseInt(hmsArray.pop(), 10);
      minutes *= 60;
    }
    return seconds;
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
