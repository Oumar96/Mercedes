const Slot = require('../../models/slot');
const Appointment = require('../../models/appointment');
const Patient = require('../../models/patient');

const slotController = {
  slots: async () => {
    try {
      const slots = await Slot.find();
      return slots.map(slot => {
        return {
          ...slot._doc,
          _id: slot.id
        };
      });
    } catch (err) {
      throw err;
    }
  }
};

module.exports = slotController;
