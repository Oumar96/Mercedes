const authResolver = require('./auth');
const appointmentResolver = require('./appointment2');
const patientResolver = require('./patient');
const nurseResolver = require('./nurse');
const doctorResolver = require('./doctor');
const slotResolver = require('./slot2');

const rootResolver = {
  ...authResolver,
  ...appointmentResolver,
  ...patientResolver,
  ...nurseResolver,
  ...doctorResolver,
  ...slotResolver
};

module.exports = rootResolver;
