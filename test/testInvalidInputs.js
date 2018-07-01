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
        result: 'Please check your input and use the YYYY-MM-DD HH:MM format',
      },
      {
        date: wrongDateInputs.notValidFormat,
        turnaroundHours: validTurnaroundHours.twoHours,
        result: 'Please check your input and use the YYYY-MM-DD HH:MM format',
      },
      {
        date: wrongDateInputs.weekend,
        turnaroundHours: validTurnaroundHours.twoHours,
        result: 'Please only submit bugs in working hours',
      },
      {
        date: wrongDateInputs.afterWorkHours,
        turnaroundHours: validTurnaroundHours.twoHours,
        result: 'Please only submit bugs in working hours',
      },
      {
        date: wrongDateInputs.notExistentDay,
        turnaroundHours: validTurnaroundHours.twoHours,
        result: 'Please check your input and use the YYYY-MM-DD HH:MM format',
      },
      {
        date: validDateInputs.mondayHour9,
        turnaroundHours: wrongTurnaroundHours.notEnoughTime,
        result: 'Turnaround time must be greater than 0',
      },
    ];

    invalidDateAssertions.forEach(({date, turnaroundHours, result}) => {
      describe(`When called with ${date} and ${turnaroundHours}`, function() {
        it(`should return ${result}`, function() {
          expect(
            dueDateCalculator.calculateDueDate(date, turnaroundHours)
          ).to.equal(result);
        });
      });
    });
  });
});
