const Slot = require('../../models/slot');
const Appointment = require('../../models/appointment');
const Patient = require('../../models/patient');

const appointmentController = {
  appointments: async () => {
    try {
      const appointments = await Appointment.find();
      return appointments.map(appointment => {
        return {
          ...appointment._doc,
          _id: appointment.id
        };
      });
    } catch (err) {
      throw err;
    }
  }
};

module.exports = appointmentController;
