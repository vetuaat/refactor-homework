'use strict';
const {expect} = require('chai');
const dueDateProgram = require('../src/index');
const {wrongDateInputs, validDateInputs, wrongTurnaroundHours, validTurnaroundHours} = require('./testInputs');
const dueDateCalculator = new dueDateProgram();


describe('Test dueDateProgram', function() {
  describe('with invalid input, it returns an error', function() {
    const invalidDateAssertions = [
      {
        date: wrongDateInputs.emptyInput,
        turnaroundHours: validTurnaroundHours.twoHours,
        behavior: 'should throw exception if there is no date input',
        result: 'Please check your input and use the YYYY-MM-DD HH:MM format',
      },
      {
        date: wrongDateInputs.notValidFormat,
        turnaroundHours: validTurnaroundHours.twoHours,
        behavior: 'should throw exception if given date is not a valid YYYY-MM-DD HH:MM format',
        result: 'Please check your input and use the YYYY-MM-DD HH:MM format',
      },
      {
        date: wrongDateInputs.weekend,
        turnaroundHours: validTurnaroundHours.twoHours,
        behavior: 'should throw exception if given date is weekend',
        result: 'Please only submit bugs in working hours',
      },
      {
        date: wrongDateInputs.afterWorkHours,
        turnaroundHours: validTurnaroundHours.twoHours,
        behavior: 'should throw exception if given date is after workhours',
        result: 'Please only submit bugs in working hours',
      },
      {
        date: wrongDateInputs.notExistentDay,
        turnaroundHours: validTurnaroundHours.twoHours,
        behavior: 'should throw exception if given date is not existent',
        result: 'Please check your input and use the YYYY-MM-DD HH:MM format',
      },
      {
        date: validDateInputs.mondayHour9,
        turnaroundHours: wrongTurnaroundHours.notEnoughTime,
        behavior: 'should throw exception if given turnaround time is a negative or 0 number',
        result: 'Turnaround time must be greater than 0',
      },
    ];

    invalidDateAssertions.forEach(({date, turnaroundHours, behavior, result}) => {
      describe(`When called with ${date} and ${turnaroundHours}`, function() {
        it(`${behavior}`, function() {
          expect(
            dueDateCalculator.calculateDueDate(date, turnaroundHours)
          ).to.equal(result);
        });
      });
    });
  });
});
