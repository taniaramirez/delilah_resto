const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const db = require("./config.js");
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
const middlewares = require("./middlewares/middlewares.js");
const products = require("./routes/products.js");
const orders = require("./routes/orders.js");
const signature = "secretKey";
const app = express();

// ROUTES

app.use(bodyParser.json());
app.use("/products", products);
app.use("/orders", orders);
app.post("/register", (req, res) => {
  const emailSent = req.body.email;

  if (emailSent != undefined) {
    sql
      .query("SELECT * FROM users WHERE email = ?", {
        replacements: [emailSent],
        type: sql.QueryTypes.SELECT,
      })
      .then((user) => {
        if (user.length == 0) {
          const newUser = req.body;
          let newToken = jwt.sign(
            { userName: newUser.userName, fecha: +new Date() },
            signature
          );
          console.log(newUser);
          sql
            .query(
              "INSERT INTO users (userName, name, lastName, email, phone, address, password, token, is_admin) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
              {
                replacements: [
                  newUser.userName,
                  newUser.name,
                  newUser.lastName,
                  newUser.email,
                  newUser.phone,
                  newUser.address,
                  newUser.password,
                  newToken,
                  false,
                ],
                type: sql.QueryTypes.INSERT,
              }
            )
            .then(() => {
              res
                .status(200)
                .json({ msg: "You are registered", token: newToken });
            });
        } else {
          res
            .status(404)
            .json({ error: "This email has already been registered" });
        }
      });
  } else {
    res.status(404).json({ error: "Invalid email" });
  }
});

app.post("/login", (req, res) => {
  const { name, password } = req.body;
  if (name != undefined && password != undefined) {
    sql
      .query(
        'SELECT * FROM users WHERE (userName = "' +
          name +
          '" AND password = "' +
          password +
          '") OR (email = "' +
          name +
          '" AND password = "' +
          password +
          '")',
        { type: sql.QueryTypes.SELECT }
      )
      .then((user) => {
        if (user.length == 0) {
          res.status(404).json({ error: "User or password invalid" });
        } else {
          let newToken = jwt.sign(
            { userName: user[0].userName, fecha: +new Date() },
            signature
          );
          sql
            .query("UPDATE users SET token = ? WHERE id = " + user[0].id, {
              replacements: [newToken],
              type: sql.QueryTypes.UPDATE,
            })
            .then(() => {
              res
                .status(200)
                .json({ msg: "Welcome to Delilah Resto", token: newToken });
            });
        }
      });
  } else {
    res.status(404).json({ error: "Invalid data" });
  }
});

app.get(
  "/users",
  middlewares.verifyToken,
  middlewares.verifyAdm,
  (req, res) => {
    sql
      .query("SELECT * FROM users", { type: sql.QueryTypes.SELECT })
      .then((users) => {
        if (users.length > 0) {
          res.status(200).json({ msg: "Delilah Resto users", rta: users });
        } else {
          res.status(200).json({ msg: "There are no users registered" });
        }
      });
  }
);

app.get(
  "/users/:id",
  middlewares.verifyToken,
  middlewares.verifyAdm,
  (req, res) => {
    let idUser = req.params.id;

    sql
      .query("SELECT * FROM users WHERE id = ?", {
        replacements: [idUser],
        type: sql.QueryTypes.SELECT,
      })
      .then((users) => {
        if (users.length > 0) {
          res.status(200).json({ msg: "Delilah Resto user", rta: users });
        } else {
          res.status(200).json({
            msg: "Sorry, there are no users registered with that identifier",
          });
        }
      });
  }
);

//SERVER START

// app.listen("port", () => {
//   console.log("Server on port", app.get("port"));
// });

app.listen("3000", () => {
  console.log("Server on port 3000");
});
