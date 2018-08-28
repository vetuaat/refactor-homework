'use strict';
const {expect} = require('chai');
const dueDateProgram = require('../src/index');
const {wrongDateInputs, validDateInputs, wrongTurnaroundHours, validTurnaroundHours} = require('./inputs');
const {inputFormatError, overWorkHoursError, turnaroundTimeError} = require('../src/validation/customErrors');
const dueDateCalculator = new dueDateProgram();


describe('Test dueDateProgram', function() {
  describe('with invalid input, it returns an error', function() {
    const invalidDateAssertions = [
      {
        date: wrongDateInputs.emptyInput,
        turnaroundHours: validTurnaroundHours.twoHours,
        behavior: 'should throw exception if there is no date input',
        result: inputFormatError,
      },
      {
        date: wrongDateInputs.notValidFormat,
        turnaroundHours: validTurnaroundHours.twoHours,
        behavior: 'should throw exception if given date is not a valid YYYY-MM-DD HH:MM format',
        result: inputFormatError,
      },
      {
        date: wrongDateInputs.weekend,
        turnaroundHours: validTurnaroundHours.twoHours,
        behavior: 'should throw exception if given date is weekend',
        result: overWorkHoursError,
      },
      {
        date: wrongDateInputs.afterWorkHours,
        turnaroundHours: validTurnaroundHours.twoHours,
        behavior: 'should throw exception if given date is after workhours',
        result: overWorkHoursError,
      },
      {
        date: validDateInputs.mondayHour9,
        turnaroundHours: wrongTurnaroundHours.notEnoughTime,
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
