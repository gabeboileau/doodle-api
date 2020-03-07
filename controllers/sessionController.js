async function create(req, res, next) {
  try {
    let newSession = await global.db.run(
      `INSERT INTO user_session (name, email, room) VALUES(?,?,?)`,
      [req.body.name, req.body.email, null]
    );
    // const rooms = await global.db.all(
    //   `SELECT room FROM user_session HAVING COUNT(room) < 6`
    // );
    newSession = await global.db.all(
      `SELECT * FROM user_session WHERE id = ${newSession.lastID}`
    );
    res.status(200).json(newSession);
  } catch (err) {
    console.log(err);
  }
}

module.exports = { create };
