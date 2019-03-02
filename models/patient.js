const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const patientSchema = new Schema({
  hcn: {
    type: String,
    required: true
  },
  birthday: {
    type: Number
  },
  gender: {
    type: String
  },
  phoneNumber: {
    type: String
  },
  physicalAddress: {
    type: String
  },
  emailAddress: {
    type: String
  },
  createdAppointments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Appointment',
      autopopulate: { maxDepth: 2 }
    }
  ]
});
patientSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Patient', patientSchema);
