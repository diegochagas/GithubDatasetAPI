const database = require('../config/config');
const Promise = require('bluebird');

function getEvents () {
	let sql = `SELECT * FROM events 
	    INNER JOIN actors ON actors.actor_id = events.actor_id
	    INNER JOIN repos ON repos.repo_id = events.repo_id`;
    return new Promise((resolve, reject) => {
        database.db.all(sql, function (err, rows) {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

function addEvent (event) {
    addActor(event.actor);
    addRepo(event.repo);
	let sql = `INSERT INTO events (event_id, type, actor_id, repo_id, created_at) 
	    VALUES ($event_id, $type, $actor_id, $repo_id, $created_at)`;
    let params = {
        $event_id: event.id,
        $type: event.type,
        $actor_id: event.actor.id,
        $repo_id: event.repo.id,
        $created_at: event.created_at
    };
    return new Promise((resolve, reject) => {
        database.db.run(sql, params, function (err) {
            if (err) reject(err.message);
            resolve(true);
        });
    });
}

function getEventsByActor (actorID) {
    let sql = `SELECT * FROM events 
	    INNER JOIN actors ON actors.actor_id = events.actor_id
	    INNER JOIN repos ON repos.repo_id = events.repo_id
	    WHERE events.actor_id = ?`;
    return new Promise((resolve, reject) => {
        database.db.all(sql, [actorID], function (err, rows) {
            if (err) reject(err);
            resolve(rows);
        });
    });
}

function eraseAllEvents () {
    let sql = 'DELETE FROM events';
    return new Promise((resolve, reject) => {
        database.db.all(sql, function (err, rows) {
            if (err) reject(err);
            resolve(true);
        });
    });
}

function addActor (actor) {
    let sql = 'INSERT into actors (actor_id, login, avatar_url) VALUES ($actor_id, $login, $avatar_url)';
    let params = {$actor_id: actor.id, $login: actor.login, $avatar_url: actor.avatar_url};
    database.db.run(sql, params, function (err) {
        if (err) console.error(err.message);
        console.log('actor added');
    });
}

function addRepo (repo) {
    let sql = 'INSERT into repos (repo_id, name, url) VALUES ($repo_id, $name, $url)';
    let params = {$repo_id: repo.id, $name: repo.name, $url: repo.url};
    database.db.run(sql, params, function (err) {
        if (err) console.error(err.message);
        console.log('Repo added');
    });
}

module.exports = {getEvents, addEvent, getEventsByActor, eraseAllEvents, addRepo};
