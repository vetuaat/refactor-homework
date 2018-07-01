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

  describe('with valid input, it returns the due date', function() {
    describe('tests contains within day, over day and over the weekend due dates', function() {
      const validDateAssertions = [
        {
          date: validDateInputs.mondayHour9,
          turnaroundHours: validTurnaroundHours.twoHours,
          result: 'Due date: Jul 02 11:00',
        },
        {
          date: validDateInputs.mondayHour9,
          turnaroundHours: validTurnaroundHours.eightHours,
          result: 'Due date: Jul 02 17:00',
        },
        {
          date: validDateInputs.mondayHour9,
          turnaroundHours: validTurnaroundHours.tenHours,
          result: 'Due date: Jul 03 11:00',
        },
        {
          date: validDateInputs.fridayHour10,
          turnaroundHours: validTurnaroundHours.tenHours,
          result: 'Due date: Jul 09 12:00',
        },
      ];
      validDateAssertions.forEach(({date, turnaroundHours, result}) => {
        describe(`When called with ${date} and ${turnaroundHours}`, function() {
          it(`should return ${result}`, function() {
            expect(
              dueDateCalculator.calculateDueDate(date, turnaroundHours)
            ).to.equal(result);
          });
        });
      });
    });
    describe('tests contains edge cases', function() {
      it('with over month end date', function() {
        expect(
          dueDateCalculator.calculateDueDate(validDateInputs.fridayHour9, validTurnaroundHours.fourHundred)
        ).to.eql('Due date: Aug 09 17:00');
      });
      it('with over year end date', function() {
        expect(dueDateCalculator.calculateDueDate(validDateInputs.lastDayOfYearHour16, validTurnaroundHours.twoHours)).to.eql(
          'Due date: Jan 01 10:00'
        );
      });
      it('from february to march', function() {
        expect(dueDateCalculator.calculateDueDate(validDateInputs.lastDayOfFebruaryHour16Minutes12, validTurnaroundHours.twoHours)).to.eql(
          'Due date: Mar 01 10:12'
        );
      });
      it('leap february', function() {
        expect(dueDateCalculator.calculateDueDate(validDateInputs.leapYearFebruaryHour16, validTurnaroundHours.twoHours)).to.eql(
          'Due date: Mar 02 10:00'
        );
      });
    })
    
  });
});
