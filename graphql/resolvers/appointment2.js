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
  },
  cancelAppointment: async (args, req) => {
    try {
      const success = true;
      const appointment = await Appointment.findById(args.appointmentId);
      const slot = {
        ...appointment.slots._doc,
        _id: appointment.slots.id,
      };
      await Appointment.deleteOne({ _id: args.appointmentId });
      await Slot.deleteOne({ _id: slot._id });
      return success;
    } catch (err) {
      throw err;
    }
  }
};

module.exports = appointmentController;