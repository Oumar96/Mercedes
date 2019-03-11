const Slot = require('../../models/slot');
const Appointment = require('../../models/appointment');
const Patient = require('../../models/patient');

const patientController = {
  patients: async () => {
    try {
      const patients = await Patient.find();
      return patients.map(patient => {
        return {
          ...patient._doc,
          _id: patient.id
        };
      });
    } catch (err) {
      throw err;
    }
  },
  createPatient: async args => {
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    const patient = new Patient({
      hcn: args.patientInput.hcn
    });
    let createdPatient;
    try {
      const existingPatient = await Patient.findOne({ hcn: args.patientInput.hcn });
      if (existingPatient) {
        throw new Error('Patient exists already.');
      }
      const result = await patient.save();
      createdPatient = {
        ...result._doc,
        _id: result.id
      };

      return createdPatient;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};

module.exports = patientController;