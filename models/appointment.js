const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  type: String,
  slots:  {
    type: Schema.Types.ObjectId,
    ref: 'Slot',
    autopopulate: { maxDepth: 1 }
  },
  created_at: Date
});
appointmentSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Appointment', appointmentSchema);
