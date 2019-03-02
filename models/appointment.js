const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  id: ObjectId,
  name: String,
  email: String,
  phone: Number,
  slots:{type: mongoose.Schema.Types.ObjectId, ref: 'Slot'},
  created_at: Date
});

module.exports = mongoose.model('Appointment', appointmentSchema);
