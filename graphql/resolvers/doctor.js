const Doctor = require('../../models/doctor');
const Appointment = require('../../models/appointment');

const doctorController = {
  doctors: async () => {
    try {
      const doctors = await Doctor.find();
      return doctors.map(doctor => {
        return {
          ...doctor._doc,
          _id: doctor.id
        };
      });
    } catch (err) {
      throw err;
    }
  },
  createDoctor: async args => {
    const doctor = new Doctor({
      permitNumber: args.doctorInput.permitNumber,
      lastName: args.doctorInput.lastName,
      firstName: args.doctorInput.firstName,
      specialty: args.doctorInput.specialty,
      city: args.doctorInput.city
    });
    let createdDoctor;
    try {
      const existingDoctor = await Doctor.findOne({ permitNumber: args.doctorInput.permitNumber });
      if (existingDoctor) {
        throw new Error('Doctor exists already.');
      }
      const result = await doctor.save();
      createdDoctor = {
        ...result._doc,
        _id: result.id
      };

      return createdDoctor;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};

module.exports = doctorController;
