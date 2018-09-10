const {dateUtilities} = require('../src/dateUtilities');

const wrongInputs = {
  emptyInput: '',
  notValidFormat: 'notRight',
};

const dateInputs = {
  mondayHour9: dateUtilities.newUTCDate('2018-07-02T09:00Z'),
  mondayHour16Minute12: dateUtilities.newUTCDate('2018-09-10T16:12Z'),
  fridayHour9: dateUtilities.newUTCDate('2018-06-01T09:00Z'),
  fridayHour10: dateUtilities.newUTCDate('2018-07-06T10:00Z'),
  fridayHour20: dateUtilities.newUTCDate('2018-06-15T20:00Z'),
  saturdayHour9: dateUtilities.newUTCDate('2018-06-17T09:00Z'),
  lastDayOfYearHour16: dateUtilities.newUTCDate('2018-12-31T16:00Z'),
  lastDayOfFebruaryHour16Minutes12: dateUtilities.newUTCDate('2018-02-28T16:12Z'),
  leapYearFebruaryHour16: dateUtilities.newUTCDate('2020-02-28T16:00Z'),
};

const turnaroundHours = {
  zero: 0,
  twoHours: 2,
  eightHours: 8,
  tenHours: 10,
  sixteenHours: 16,
  fourHundred: 400,
};

module.exports = {wrongInputs, dateInputs, turnaroundHours};