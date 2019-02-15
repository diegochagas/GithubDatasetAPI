var express = require('express');
var router = express.Router();

const controllerEvents = require('../controllers/events');

// Route related to delete events
router.delete('/', controllerEvents.eraseEvents);

module.exports = router;
