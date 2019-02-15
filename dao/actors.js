const database = require('./config');
const Promise = require('bluebird');

function getActors () {
    let sqlRequest = `SELECT * FROM actors ORDER BY login ASC`;
    return new Promise((resolve, reject) => {
        database.db.all(sqlRequest, function (err, rows) {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

function updateActor (actor) {
    let sql = 'UPDATE actors SET avatar_url = ? WHERE actor_id = ?';
    let params = [actor.avatar_url, actor.id];
    return new Promise((resolve, reject) => {
        database.db.run(sql, params, function (err) {
            if (err) reject(err);
            resolve(this.changes);
        });
    });
}

function getTimeStamp (actorID) {
    let sql = 'SELECT created_at FROM events where actor_id = ?';
    return new Promise((resolve, reject) => {
        database.db.all(sql, [actorID], (err, rows) => {
            if (err) reject(err);
            let timeStamps = [];
            rows.forEach(row => {
                timeStamps.push(new Date(row.created_at).getTime());
            });
            let timeStamp = Math.max(...timeStamps);
            resolve(timeStamp);
        });
    });
}

function getTotalNumberOfEvents (actorID) {
    let sql = 'SELECT * FROM events where actor_id = ?';
    return new Promise((resolve, reject) => {
        database.db.all(sql, [actorID], (err, rows) => {
            if (err) reject(err);
            resolve(rows.length);
        });
    });
}

function getMaximumStreak (actorID) {
    let sql = 'SELECT created_at, actor_id FROM events where actor_id = ?';
    let promise = new Promise((resolve, reject) => {
        database.db.all(sql, [actorID], (err, rows) => {
            if (err) reject(err);
            const ONE_DAY = 1000 * 60 * 60 * 24;
            let tempDate = 0;
            let streak = 0;
            let maximumStreak = 0;
            rows.forEach(event => {
                let day = event.created_at.split(' ')[0];
                let date = new Date(day);
                let differenceMilliseconds = date - tempDate;
                let differenceDays = Math.round(differenceMilliseconds / ONE_DAY);
                if (differenceDays === 1) {
                    streak++;
                } else {
                    streak = 1;
                }
                tempDate = date;
                if (streak > maximumStreak) {
                    maximumStreak = streak;
                }
            });
            resolve(maximumStreak);
        });
    });
    let result = promise;
    return result;
}

function eraseAllActors () {
    let sql = 'DELETE FROM actors';
    return new Promise((resolve, reject) => {
        database.db.all(sql, function (err, rows) {
            if (err) reject(err);
            resolve(true);
        });
    });
}

module.exports = {getActors, updateActor, getTimeStamp, getTotalNumberOfEvents, getMaximumStreak, eraseAllActors};
