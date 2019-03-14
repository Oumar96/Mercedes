const Patient = require('../models/patient');
const Nurse = require('../models/nurse');
const Doctor = require('../models/doctor');
const User = require('../models/user');
const expect = require('chai').expect;
const should = require('chai').should();
const assert = require('assert');


/*
 * Create mock users for testing
 */
 
var testPatient = new Patient();
testPatient = {
    hcn: 'LOUX 0803 2317', 
    birthday: 800726,
    gender: 'M',
    phoneNumber: '514-1110-6666',
    physicalAddress: '123 Main St.',
    emailAddress: 'patient@email.com'
};

var testNurse = new Nurse();
testNurse = {
    accessId: 'DOL96315',
    password: 'abcd1234'
};

var testDoctor = new Doctor();
testNurse = {
    permitNumber: '2345679',
    lastName: 'Smith',
    firstName: 'John',
    specialty: 'Family Medicine',
    city: 'Montreal'
};

var testUser = new User();
testUser = {
    email: 'user@email.com',
    password: 'abcd1234'
};


/*
 * Tests to check that required attributes exist for Patient/Nurse/Doctor/User
 */

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


/*
 * Tests to check that the attributes for the test users were input in to the database correctly
 */

describe('TEST: Patient Healthcare number should equal mock Patient Healthcare number', function () {
    it('should be invalid if Healthcare number was not successfully entered in to database', function (done) {
        testPatient.should.have.property('hcn').equal('LOUX 0803 2317');
        done();
    });
});



        