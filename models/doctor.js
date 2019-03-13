const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const doctorSchema = new Schema({
  permitNumber: {
    type: Number,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  specialty: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  createdAppointments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Appointment',
      autopopulate: { maxDepth: 1 }
    }
  ]
});
doctorSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Doctor', doctorSchema);
