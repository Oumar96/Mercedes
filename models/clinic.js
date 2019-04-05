const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const clinicSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  rooms: {
    type: Number,
    required: true
  },
  physicians: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Doctor',
      autopopulate: { maxDepth: 1 }
    }
  ],
  nurses: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Nurse',
      autopopulate: { maxDepth: 1 }
    }
  ],
  patients: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Patient',
      autopopulate: { maxDepth: 1 }
    }
  ]
});
clinicSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Clinic', clinicSchema);
