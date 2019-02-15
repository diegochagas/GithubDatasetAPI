const actorsDao = require('../dao/actors');
const actorsModel = require('../models/actors');

var getAllActors = (req, res) => {
    actorsDao.getActors()
        .then(rows => {
            let actors = [];
            rows.forEach(actor => {
                actors.push(actorsModel.createActor(actor.actor_id, actor.login, actor.avatar_url));
            });
            let mapPromises = actors.map(async actor => {
                actor.totalNumberOfEvents = await actorsDao.getTotalNumberOfEvents(actor.id);
                actor.timeStamp = await actorsDao.getTimeStamp(actor.id);
                return actor;
            });
            return Promise.all(mapPromises);
        }).then(actors => {
            actors.sort((a, b) => {
                if (a.totalNumberOfEvents > b.totalNumberOfEvents) return -1;
                else if (a.totalNumberOfEvents < b.totalNumberOfEvents) return 1;
                else {
                    if (a.timeStamp > b.timeStamp) return -1;
                    else if (a.timeStamp < b.timeStamp) return 1;
                    else return 0;
                }
            });
            actors.forEach(actor => {
                delete actor.totalNumberOfEvents;
                delete actor.timeStamp;
            });
            res.status(200).send(actors);
        }).catch(err => {
            console.error(err);
            res.status(500).send(err);
        });
};

var updateActor = (req, res) => {
    actorsDao.updateActor(req.body)
        .then(changes => {
            if (changes === 1) {
                res.status(200).send('Actor avatar URL updated');
            } else if (changes === 0) {
                res.status(400).send(`Other fields can't being updated`);
            } else {
                res.status(404).send('Actor does not exist');
            }
        }).catch(err => {
            console.error(err);
            res.status(404).send('Actor does not exist');
        });
};

var getStreak = (req, res) => {
    actorsDao.getActors()
        .then(rows => {
            let actors = [];
            rows.forEach(actor => {
                actors.push(actorsModel.createActor(actor.actor_id, actor.login, actor.avatar_url));
            });
            let mapPromises = actors.map(async actor => {
                actor.maximumStreak = await actorsDao.getMaximumStreak(actor.id);
                actor.timeStamp = await actorsDao.getTimeStamp(actor.id);
                return actor;
            });
            return Promise.all(mapPromises);
        }).then(actors => {
            actors.sort((a, b) => {
                if (a.maximumStreak > b.maximumStreak) return -1;
                else if (a.maximumStreak < b.maximumStreak) return 1;
                else {
                    if (a.timeStamp > b.timeStamp) return -1;
                    else if (a.timeStamp < b.timeStamp) return 1;
                    else return 0;
                }
            });
            actors.forEach(actor => {
                delete actor.maximumStreak;
                delete actor.timeStamp;
            });
            res.status(200).send(actors);
        }).catch(err => {
            console.error(err);
            res.status(500).send(err);
        });
};

module.exports = {
    updateActor: updateActor,
    getAllActors: getAllActors,
    getStreak: getStreak
};
