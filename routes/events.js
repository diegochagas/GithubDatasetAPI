var express = require('express');
var router = express.Router();

const controllerEvents = require('../controllers/events');

// Routes related to event
router.get('/', controllerEvents.getAllEvents);

router.post('/', controllerEvents.addEvent);

router.get('/actors/:actorID', controllerEvents.getByActor);

module.exports = router;
