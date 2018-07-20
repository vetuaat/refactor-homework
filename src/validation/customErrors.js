'use strict'

class inputFormatError extends Error {
  constructor(message = 'Please check your input and use the YYYY-MM-DD HH:MM format',...params) {
    super(...params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, inputFormatError);
    }
    this.message = message;
  }
}

class turnaroundTimeError extends Error {
  constructor(message = 'Turnaround time must be greater than 0', ...params) {
    super(...params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, turnaroundTimeError);
    }
  }
}

class overWorkHoursError extends Error {
  constructor(message = 'Please only submit bugs in working hours', ...params) {
    super(...params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, turnaroundTimeError);
    }
  }
}


module.exports = {inputFormatError, turnaroundTimeError, overWorkHoursError};