const Nurse = require('../../models/nurse');
const Appointment = require('../../models/appointment');

const nurseController = {
  nurses: async () => {
    try {
      const nurses = await Nurse.find();
      return nurses.map(nurse => {
        return {
          ...nurse._doc,
          _id: nurse.id
        };
      });
    } catch (err) {
      throw err;
    }
  },
  createNurse: async args => {
    const nurse = new Nurse({
      accessId: args.nurseInput.accessId,
      password: args.nurseInput.password
    });
    let createdNurse;
    try {
      const existingNurse = await Nurse.findOne({ accessId: args.nurseInput.accessId });
      if (existingNurse) {
        throw new Error('Nurse exists already.');
      }
      const result = await nurse.save();
      createdNurse = {
        ...result._doc,
        _id: result.id
      };

      return createdNurse;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};

module.exports = nurseController;
