const express = require('express');
const router = express.Router();

const appointmentController = require('../../graphql/resolvers/appointment')
const slotController = require('../../graphql/resolvers/slot')

router.get('/appointments', appointmentController.all);
router.get('/retrieveSlots', slotController.all);
router.post('/appointmentCreate', appointmentController.create);

module.exports = router;
