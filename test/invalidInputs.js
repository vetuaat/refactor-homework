'use strict';
const {expect} = require('chai');
const dueDateProgram = require('../src');
const {dateInputs, wrongInputs, turnaroundHours} = require('./inputs');
const {inputFormatError, overWorkHoursError, turnaroundTimeError} = require('../src/validation/customErrors');
const dueDateCalculator = new dueDateProgram();


describe('Test dueDateProgram', function() {
  describe('with invalid input, it returns an error', function() {
    const invalidDateAssertions = [
      {
        date: wrongInputs.emptyInput,
        turnaroundHours: turnaroundHours.twoHours,
        behavior: 'should throw exception if there is no date input',
        result: inputFormatError,
      },
      {
        date: wrongInputs.notValidFormat,
        turnaroundHours: turnaroundHours.twoHours,
        behavior: 'should throw exception if given date is not a valid YYYY-MM-DD HH:MM format',
        result: inputFormatError,
      },
      {
        date: dateInputs.saturdayHour9,
        turnaroundHours: turnaroundHours.twoHours,
        behavior: 'should throw exception if given date is weekend',
        result: overWorkHoursError,
      },
      {
        date: dateInputs.fridayHour20,
        turnaroundHours: turnaroundHours.twoHours,
        behavior: 'should throw exception if given date is after workhours',
        result: overWorkHoursError,
      },
      {
        date: dateInputs.mondayHour9,
        turnaroundHours: turnaroundHours.zero,
        behavior: 'should throw exception if given turnaround time is a negative or 0 number',
        result: turnaroundTimeError,
      },
    ];

    invalidDateAssertions.forEach(({date, turnaroundHours, behavior, result}) => {
      describe(`When called with ${date} and ${turnaroundHours}`, function() {
        it(`${behavior}`, function() {
          expect(
            dueDateCalculator.calculateDueDate(date, turnaroundHours)
          ).to.be.an.instanceof(result);
        });
      });
    });
  });
});
