const eventsDao = require('../dao/events');
const eventsModel = require('../models/events');

var getAllEvents = (req, res) => {
    eventsDao.getEvents()
        .then(rows => {
            let events = [];
            rows.forEach(row => {
                let event = eventsModel.createEvent(row.event_id, row.type, row.actor_id, row.login, row.avatar_url, row.repo_id, row.name, row.url, row.created_at);
                events.push(event);
            });
            events.sort((a, b) => {
               if (a.id < b.id) return -1;
               else if (a.id > b.id) return 1;
               return 0;
            });
            res.status(200).send(events);
        }).catch(error => {
            console.error(error);
            res.status(404).send(error);
        });
};

var addEvent = (req, res) => {
    eventsDao.addEvent(req.body)
        .then(result => {
            res.status(201).send('Event added with success');
        }).catch(err => {
            console.error(err);
            res.status(400).send('Event already exist');
        });
};

var getByActor = (req, res) => {
    eventsDao.getEventsByActor(parseInt(req.params.actorID))
        .then(rows => {
            if (rows === undefined) {
                res.status(404).send('Actor not found');
            } else {
                let events = [];
                rows.forEach(row => {
                    let event = eventsModel.createEvent(row.event_id, row.type, row.actor_id, row.login, row.avatar_url, row.repo_id, row.name, row.url, row.created_at);
                    events.push(event);
                });
                events.sort((a, b) => {
                    if (a.id < b.id) return -1;
                    else if (a.id > b.id) return 1;
                    return 0;
                });
                res.status(200).send(events);
            }
        }).catch(err => {
            console.error(err);
        });
};

var eraseEvents = (req, res) => {
    eventsDao.eraseAllEvents()
        .then(result => res.status(200).send('all events erased'))
        .catch(err => {
            console.error(err);
            res.status(500).send(err);
        });
};

module.exports = {
	getAllEvents: getAllEvents,
	addEvent: addEvent,
	getByActor: getByActor,
	eraseEvents: eraseEvents
};
