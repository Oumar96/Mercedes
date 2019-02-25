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
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'Patient',
    autopopulate: { select: ['emailAddress', 'physicalAddress'], maxDepth: 1 }
  }
});
appointmentSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Appointment', appointmentSchema);
