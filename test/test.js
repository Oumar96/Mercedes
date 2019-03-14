const Patient = require('../models/patient');
const Nurse = require('../models/nurse');
const Doctor = require('../models/doctor');
const User = require('../models/user');
const expect = require('chai').expect;
const assert = require('assert');

describe('TEST: Patient has valid healthcare number', function () {
    it('should be invalid if patient healthcare number is not given', function (done) {
        var patient = new Patient();

        // Require 'expect' as it is not included in mocha
        patient.validate(function (err) {
            expect(err.errors.hcn).to.exist;
            done();
        });
    });
});

describe('TEST: Nurse has valid accessId number', function () {
    it('should be invalid if nurse accessId is not given', function (done) {
        var nurse = new Nurse();

        // Require 'expect' as it is not included in mocha
        nurse.validate(function (err) {
            expect(err.errors.accessId).to.exist;
            done();
        });
    });
});

describe('TEST: Nurse has valid password', function () {
    it('should be invalid if nurse password is not given', function (done) {
        var nurse = new Nurse();

        // Require 'expect' as it is not included in mocha
        nurse.validate(function (err) {
            expect(err.errors.password).to.exist;
            done();
        });
    });
});

describe('TEST: Doctor has valid permitNumber', function () {
    it('should be invalid if doctor permitNumber is not given', function (done) {
        var doctor = new Doctor();

        // Require 'expect' as it is not included in mocha
        doctor.validate(function (err) {
            expect(err.errors.permitNumber).to.exist;
            done();
        });
    });
});

describe('TEST: Doctor has valid lastName', function () {
    it('should be invalid if doctor lastName is not given', function (done) {
        var doctor = new Doctor();

        // Require 'expect' as it is not included in mocha
        doctor.validate(function (err) {
            expect(err.errors.lastName).to.exist;
            done();
        });
    });
});

describe('TEST: Doctor has valid firstName', function () {
    it('should be invalid if doctor firstName is not given', function (done) {
        var doctor = new Doctor();

        // Require 'expect' as it is not included in mocha
        doctor.validate(function (err) {
            expect(err.errors.firstName).to.exist;
            done();
        });
    });
});

describe('TEST: Doctor has valid specialty', function () {
    it('should be invalid if doctor specialty is not given', function (done) {
        var doctor = new Doctor();

        // Require 'expect' as it is not included in mocha
        doctor.validate(function (err) {
            expect(err.errors.specialty).to.exist;
            done();
        });
    });
});

describe('TEST: Doctor has valid city', function () {
    it('should be invalid if doctor city is not given', function (done) {
        var doctor = new Doctor();

        // Require 'expect' as it is not included in mocha
        doctor.validate(function (err) {
            expect(err.errors.city).to.exist;
            done();
        });
    });
});

describe('TEST: User has valid email', function () {
    it('should be invalid if user email is not given', function (done) {
        var user = new User();

        // Require 'expect' as it is not included in mocha
        user.validate(function (err) {
            expect(err.errors.email).to.exist;
            done();
        });
    });
});

describe('TEST: User has valid password', function () {
    it('should be invalid if user password is not given', function (done) {
        var user = new User();

        // Require 'expect' as it is not included in mocha
        user.validate(function (err) {
            expect(err.errors.password).to.exist;
            done();
        });
    });
});