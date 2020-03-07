async function create(req, res, next) {
  try {
    const rooms = await global.db.all(
      `SELECT room, COUNT(room)
        FROM user_session 
       GROUP BY room
      HAVING COUNT(room) < 6
      ORDER BY room desc`
    );
    let selectedRoom;
    if (!rooms[0] || !rooms[0].room) {
      selectedRoom = await await global.db.run(
        `INSERT INTO room (name) VALUES(?)`,
        ["moist"]
      );
      selectedRoom = selectedRoom.lastID;
    } else {
      selectedRoom = rooms[0].room;
    }
    let newSession = await global.db.run(
      `INSERT INTO user_session (name, email, room) VALUES(?,?,?)`,
      [req.body.name, req.body.email, selectedRoom]
    );
    newSession = await global.db.all(
      `SELECT * FROM user_session WHERE id = ${newSession.lastID}`
    );
    res.status(200).json(newSession);
  } catch (err) {
    console.log(err);
  }
}

module.exports = { create };
