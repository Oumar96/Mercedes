const Clinic = require('../../models/clinic');
const Doctor = require('../../models/doctor');
const Nurse = require('../../models/nurse');
const Patient = require('../../models/patient');

const clinicController = {
  clinics: async () => {
    try {
      const clinics = await Clinic.find();
      return clinics.map(clinic => {
        return {
          ...clinic._doc,
          _id: clinic.id
        };
      });
    } catch (err) {
      throw err;
    }
  },
  createClinic: async args => {
    const clinic = new Clinic({
      name: args.name,
      location: args.location,
      rooms: args.rooms
    });
    try {
      const existingClinic = await Clinic.findOne({
        name: args.name
      });
      if (existingClinic) {
        throw new Error('Clinic exists already.');
      }
      await clinic.save();
      return clinic;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  pushPerson: async args => {
    const success = true;
    try {
      const existingClinic = await Clinic.findOne({
        name: args.name
      });
      if (!existingClinic) {
        throw new Error('Clinic does not exist.');
      }
      if (args.type === 'Doctor') {
        const existingPerson = await Doctor.findOne({ 'permitNumber': args.permitNumber });
        if (!existingPerson) {
          throw new Error('Person does not exist.');
        }
        existingClinic.physicians.push(existingPerson._id);
      }
      if (args.type === 'Nurse') {
        const existingPerson = await Nurse.findOne({ 'accessId': args.accessId });
        if (!existingPerson) {
          throw new Error('Person does not exist.');
        }
        existingClinic.nurses.push(existingPerson._id);
      }
      if (args.type === 'Patient') {
        const existingPerson = await Patient.findOne({ 'hcn': args.hcn });
        if (!existingPerson) {
          throw new Error('Person does not exist.');
        }
        existingClinic.patients.push(existingPerson._id);
      }
      await existingClinic.save();
      return success;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};

module.exports = clinicController;
