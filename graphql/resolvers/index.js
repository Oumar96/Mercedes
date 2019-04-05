const authResolver = require('./auth');
const appointmentResolver = require('./appointment2');
const patientResolver = require('./patient');
const nurseResolver = require('./nurse');
const doctorResolver = require('./doctor');
const slotResolver = require('./slot2');
const clinicResolver = require('./clinic');

const rootResolver = {
  ...authResolver,
  ...appointmentResolver,
  ...patientResolver,
  ...nurseResolver,
  ...doctorResolver,
  ...slotResolver,
  ...clinicResolver
};

module.exports = rootResolver;
