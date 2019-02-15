let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database(':memory:');

function createTables () {
    let sqlActors = `CREATE TABLE IF NOT EXISTS actors (
            actor_id integer primary key,
            login text not null unique, 
            avatar_url text not null)`;
    db.run(sqlActors, err => {
        if (err) console.error(err.message);
        else console.log('Table actors created');
    });
    let sqlRepos = `CREATE TABLE IF NOT EXISTS repos (
            repo_id integer primary key,
            name text not null, 
            url text not null)`;
    db.run(sqlRepos, err => {
        if (err) console.error(err.message);
        else console.log('Table repos created');
    });
    let sqlEvents = `CREATE TABLE IF NOT EXISTS events (
            event_id integer primary key,
            type text not null, 
            actor_id integer NOT NULL,
            repo_id integer NOT NULL,
            created_at text not null,
            FOREIGN KEY (actor_id) REFERENCES actors (actor_id),
            FOREIGN KEY (repo_id) REFERENCES repos (repo_id))`;
    db.run(sqlEvents, err => {
        if (err) console.error(err.message);
        else console.log('Table events created');
    });
};

module.exports = {createTables, db};
