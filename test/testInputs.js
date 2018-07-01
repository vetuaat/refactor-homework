const wrongDateInputs = {
  emptyInput: '',
  notValidFormat: 'notRight',
  weekend: '2018-06-17 09:00',
  afterWorkHours: '2018-06-15 20:00',
  notExistentDay: '2018-06-31 09:00',
};

const validDateInputs = {
  weekdayHour9: '2018-07-02 09:00',
};

const wrongTurnaroundHours = {
  notEnoughTime: 0,
};

const validTurnaroundHours = {
  twoHours: 2,
};

module.exports = {wrongDateInputs, validDateInputs, wrongTurnaroundHours, validTurnaroundHours};