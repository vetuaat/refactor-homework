'use strict'

const {expect} = require('chai');
const dueDateProgram = require('../src/index');
const {validDateInputs, validTurnaroundHours} = require('./testInputs');
const dueDateCalculator = new dueDateProgram();

describe('Test dueDateProgram', function() {
  describe('with valid input, it returns the due date', function() {
    describe('tests contains within day, over day and over the weekend due dates', function() {
      const validDateAssertions = [
        {
          date: validDateInputs.mondayHour9,
          turnaroundHours: validTurnaroundHours.twoHours,
          behavior: 'should return with due date in the current day',
          result: 'Due date: Jul 02 11:00',
        },
        {
          date: validDateInputs.mondayHour9,
          turnaroundHours: validTurnaroundHours.eightHours,
          behavior: 'should return with due date at the end of the current day',
          result: 'Due date: Jul 02 17:00',
        },
        {
          date: validDateInputs.mondayHour9,
          turnaroundHours: validTurnaroundHours.tenHours,
          behavior: 'should return with due date at the next day if turnaround time is fall out from the current day',
          result: 'Due date: Jul 03 11:00',
        },
        {
          date: validDateInputs.fridayHour10,
          turnaroundHours: validTurnaroundHours.tenHours,
          behavior: 'should return with due date at the next next week if there is a weekend',
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
      it('should return with due date at the next month if the current date is at the end of the month or the given turnaround time is more than the remainig hours in the month', function() {
        expect(
          dueDateCalculator.calculateDueDate(validDateInputs.fridayHour9, validTurnaroundHours.fourHundred)
        ).to.eql('Due date: Aug 09 17:00');
      });
      it('should return with due date at the next year if the current date is at the end of the year or the given turnaround time is more than the remainig hours in the year', function() {
        expect(dueDateCalculator.calculateDueDate(validDateInputs.lastDayOfYearHour16, validTurnaroundHours.twoHours)).to.eql(
          'Due date: Jan 01 10:00'
        );
      });
      it('should return with the correct due date (March) if the current day is at the end of February', function() {
        expect(dueDateCalculator.calculateDueDate(validDateInputs.lastDayOfFebruaryHour16Minutes12, validTurnaroundHours.twoHours)).to.eql(
          'Due date: Mar 01 10:12'
        );
      });
      it('should return with correct due date if it has to calculate with leap year', function() {
        expect(dueDateCalculator.calculateDueDate(validDateInputs.leapYearFebruaryHour16, validTurnaroundHours.twoHours)).to.eql(
          'Due date: Mar 02 10:00'
        );
      });
    })
    
  });
});