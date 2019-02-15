var express = require('express');
var router = express.Router();

const controllerActors = require('../controllers/actors');

// Routes related to actor.
router.get('/', controllerActors.getAllActors);

router.put('/', controllerActors.updateActor);

router.get('/streak', controllerActors.getStreak);

module.exports = router;
