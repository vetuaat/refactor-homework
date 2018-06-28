'use strict';
const {expect} = require('chai');
const dueDateProgram = require('../src/index');


describe('Test', function() {
  describe('wrong input, shows a message if', function() {
    it('the input does not match the format', function() {
      expect(dueDateProgram.calculateDueDate('', 1)).to.eql(
        'Please check your input and use the YYYY-MM-DD HH:MM format'
      );
    });
    it('the input does not match the format', function() {
      expect(dueDateProgram.calculateDueDate('notRight', 1)).to.eql(
        'Please check your input and use the YYYY-MM-DD HH:MM format'
      );
    });
    it('the bug was not report in worktime', function() {
      expect(dueDateProgram.calculateDueDate('2018-06-15 20:00', 2)).to.eql(
        'Please only submit bugs in working hours'
      );
    });
    it('the bug was not report in a workday', function() {
      expect(dueDateProgram.calculateDueDate('2018-06-17 13:00', 2)).to.eql(
        'Please only submit bugs in working hours'
      );
    });
    it('not existent day', function() {
      expect(dueDateProgram.calculateDueDate('2018-06-31 13:00', 1)).to.eql(
        'Please check your input and use the YYYY-MM-DD HH:MM format'
      );
    });
    it('not enough time to solve the problem', function() {
      expect(dueDateProgram.calculateDueDate('2018-06-15 15:00', 0)).to.eql(
        'Turnaround time must be greater than 0'
      );
    });
  });
  describe('correct input', function() {
    it('within day', function() {
      expect(dueDateProgram.calculateDueDate('2018-06-11 10:00', 1)).to.eql('Due date: Jun 11 11:00');
    });
    it('within day', function() {
      expect(dueDateProgram.calculateDueDate('2018-06-11 09:26', 5)).to.eql('Due date: Jun 11 14:26');
    });
    it('within full day', function() {
      expect(dueDateProgram.calculateDueDate('2018-06-11 09:00', 8)).to.eql('Due date: Jun 11 17:00');
    });
    it('with overday', function() {
      expect(dueDateProgram.calculateDueDate('2018-06-11 10:00', 8)).to.eql('Due date: Jun 12 10:00');
    });
    it('with overday', function() {
      expect(dueDateProgram.calculateDueDate('2018-06-11 10:00', 11)).to.eql('Due date: Jun 12 13:00');
    });
    it('with overday', function() {
      expect(dueDateProgram.calculateDueDate('2018-06-04 09:15', 8)).to.eql('Due date: Jun 05 09:15');
    });
    it('with overday', function() {
      expect(dueDateProgram.calculateDueDate('2018-06-04 10:15', 16)).to.eql('Due date: Jun 06 10:15');
    });
    it('with weekend', function() {
      expect(dueDateProgram.calculateDueDate('2018-06-15 15:00', 5)).to.eql('Due date: Jun 18 12:00');
    });
    it('with weekend', function() {
      expect(dueDateProgram.calculateDueDate('2018-05-31 16:00', 10)).to.eql('Due date: Jun 04 10:00');
    });
    it('with over month end date', function() {
      expect(dueDateProgram.calculateDueDate('2018-06-01 09:00', 400)).to.eql('Due date: Aug 09 17:00');
    });
    it('with over year end date', function() {
      expect(dueDateProgram.calculateDueDate('2018-12-31 16:00', 2)).to.eql('Due date: Jan 01 10:00');
    });
    it('from february to march', function() {
      expect(dueDateProgram.calculateDueDate('2018-02-28 16:12', 2)).to.eql('Due date: Mar 01 10:12');
    });
    it('leap february', function() {
      expect(dueDateProgram.calculateDueDate('2020-02-28 16:00', 2)).to.eql('Due date: Mar 02 10:00');
    });
  });
});
