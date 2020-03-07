const sqlite = require("sqlite");

async function connect() {
  const db = await sqlite.open("./db/doodle.db", { Promise });
  await db.all(
    `
      CREATE TABLE IF NOT EXISTS user_session (
          id INTEGER PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT UNIQUE,
          room INTEGER
      );`
  );
  await db.all(
    `
      CREATE TABLE IF NOT EXISTS room (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL
    );`
  );
  global.db = db;
}
module.exports = { connect };
