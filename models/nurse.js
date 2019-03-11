const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const nurseSchema = new Schema({
    accessId: {
        type: String,
        required: true
    } ,
    password: {
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
nurseSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Nurse', nurseSchema);