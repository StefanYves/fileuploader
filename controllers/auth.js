const db = require("../db/index");

async function createUser(req, res) {
  const { username, password } = req.body;
  await db.addUser(username, password);

  res.redirect("/login");
}

module.exports = { createUser };
