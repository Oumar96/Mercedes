const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
