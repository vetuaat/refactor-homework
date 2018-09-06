'use strict';

class dateUtilities {


  static getCurrentDayName(date) {
    return date.toLocaleDateString('en-EN', {weekday: 'long'});
  }

  static getFullDayWorkHours(startHour, endHour) {
    return endHour - startHour;
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
