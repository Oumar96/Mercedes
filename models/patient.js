const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const patientSchema = new Schema({
  hcn: {
    type: String,
    required: true
  } ,
  password: {
    type: String,
    required: true
  },
  birthday: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  physicalAddress: {
    type: String,
    required: true
  },
  emailAddress: {
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
patientSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Patient', patientSchema);
