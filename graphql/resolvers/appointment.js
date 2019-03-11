const Slot = require('../../models/slot');
const Appointment = require('../../models/appointment');
const Patient = require('../../models/patient');

const appointmentController = {
  all: (req, res) => {
    // Returns all appointments
    Appointment.find({}).exec((err, appointments) => res.json(appointments));
  },
  create: async (req, res) => {
    var requestBody = req.body;
    const newslot = new Slot({
      slot_time: requestBody.slot_time,
      slot_date: requestBody.slot_date,
      created_at: Date.now()
    });
    try {
      const patient = await Patient.findOne({ 'hcn': requestBody.hcn });
      if (!patient) {
        throw new Error('Patient not found.');
      }
      var annual = await patient.createdAppointments.find(function(appointment) {
        return appointment.type === "Annual";
      });
      if(annual && requestBody.type === "Annual") {
        throw new Error('Annual appointment exists')
      }
      const slot = await Slot.find({ 'slot_time': requestBody.slot_time, 'slot_date': requestBody.slot_date });
      if (slot.length > 4) {
        throw new Error('Fully booked on date/time');
      }
      await newslot.save();
      // Creates a new record from a submitted form
      const newappointment = new Appointment({
        type: requestBody.type,
        slots: newslot._id
      });
      // and saves the record to the data base
      await newappointment.save((err, saved) => {
        // Returns the saved appointment after a successful save
        result = Appointment.find({ _id: saved._id })
        .populate("slots")
        .exec((err, appointment) => res.json(appointment));
      });
      patient.createdAppointments.push(newappointment._id);
      await patient.save();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};

module.exports = appointmentController;