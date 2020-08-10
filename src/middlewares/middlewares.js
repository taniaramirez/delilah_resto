const jwt = require("jsonwebtoken");
const db = require("../config.js");
const Sequelize = require("sequelize");
const sql = new Sequelize(
  "mysql://" +
    db.user +
    ":" +
    db.password +
    "@" +
    db.url +
    ":" +
    db.port +
    "/delilah"
);
const signature = "secretKey";

function verifyToken(req, res, next) {
  const headers = req.headers.authorization;
  if (headers) {
    const token = headers.split(" ")[1];
    console.log(token);
    jwt.verify(token, signature, (err, data) => {
      if (err) {
        res.status(401).json({ error: "Invalid token" });
      } else {
        console.log(data);
        next();
      }
    });
  } else {
    res.status(401).json({ error: "Missing token" });
  }
}

function verifyAdm(req, res, next) {
  const headers = req.headers.authorization;
  const token = headers.split(" ")[1];

  sql
    .query("SELECT * FROM users WHERE token = ?", {
      replacements: [token],
      type: sql.QueryTypes.SELECT,
    })
    .then((user) => {
      if (user.length == 0) {
        res
          .status(404)
          .json({ error: "Sorry! There is no user for that token" });
      } else {
        console.log(user);
        if (user[0].is_admin == 1) {
          next();
        } else {
          res.status(404).json({ error: "Permission denied" });
        }
      }
    });
}

module.exports = { verifyToken: verifyToken, verifyAdm: verifyAdm };
