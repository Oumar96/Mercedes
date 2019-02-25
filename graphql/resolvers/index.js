const bcrypt = require('bcryptjs');
const Appointment = require('../../models/appointment');
const Patient = require('../../models/patient');

module.exports = {
  appointments: async () => {
    try {
      const appointments = await Appointment.find()
      return appointments
      .map(appointment => {
        // Converting _id to a string to show in graphiql
        return { ...appointment._doc, _id: appointment.id, date: new Date(appointment._doc.date).toISOString() }
      });
    }
    catch (err) {
      throw err
    };
  },
  createAppointment: async args => {
    const appointment = new Appointment({
      date: new Date(args.appointmentInput.date).toISOString(),
      price: +args.appointmentInput.price,
      // Hardcoded for now
      creator: '5c736ba22d6d650fdca8c3bd'
    });
    let createdAppointment;
    try {
      const result = await appointment
      // save() function provided by mongoose package
      .save()
      createdAppointment = { ...result._doc, _id: appointment.id, date: new Date(appointment._doc.date).toISOString() };
      // Hardcoded for now
      const patient = await Patient.findById('5c736ba22d6d650fdca8c3bd');
      if(!patient) {
        throw new Error('User does not exist.');
      }
      patient.createdAppointments.push(appointment);
      await patient.save();
      return createdAppointment;
    } catch (err) {
      console.log(err);
      throw err;
    };
  },
  createPatient: async args => {
    try {
      const existingPatient = await Patient.findOne({ emailAddress: args.patientInput.emailAddress })
      if(existingPatient) {
        throw new Error('User exists already.');
      }
      const hashedPassword = await bcrypt.hash(args.patientInput.password, 12);
      const patient = new Patient({
        hcn: args.patientInput.hcn,
        password: hashedPassword,
        birthday: +args.patientInput.birthday,
        gender: args.patientInput.gender,
        phoneNumber: +args.patientInput.phoneNumber,
        physicalAddress: args.patientInput.physicalAddress,
        emailAddress: args.patientInput.emailAddress
      });
      const result = await patient.save();
      return { ...result._doc, _id: result.id, password: null }
    } catch (err) {
      throw err;
    };
  }
}
