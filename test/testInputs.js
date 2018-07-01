const wrongDateInputs = {
  emptyInput: '',
  notValidFormat: 'notRight',
  weekend: '2018-06-17 09:00',
  afterWorkHours: '2018-06-15 20:00',
  notExistentDay: '2018-06-31 09:00',
};

const validDateInputs = {
  mondayHour9: '2018-07-02 09:00',
  fridayHour9: '2018-06-01 09:00',
  fridayHour10: '2018-07-06 10:00',
  lastDayOfYearHour16: '2018-12-31 16:00',
  lastDayOfFebruaryHour16Minutes12: '2018-02-28 16:12',
  leapYearFebruaryHour16: '2020-02-28 16:00',
};

const wrongTurnaroundHours = {
  notEnoughTime: 0,
};

const validTurnaroundHours = {
  twoHours: 2,
  eightHours: 8,
  tenHours: 10,
  sixteenHours: 16,
  fourHundred: 400,
};

module.exports = {wrongDateInputs, validDateInputs, wrongTurnaroundHours, validTurnaroundHours};