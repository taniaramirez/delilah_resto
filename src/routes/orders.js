const express = require("express");
const bodyParser = require("body-parser");
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
const middlewares = require("../middlewares/middlewares.js");
const router = express.Router();

router.use(bodyParser.json());

router.post("/", middlewares.verifyToken, (req, res) => {
  let userToken = req.headers.authorization.split(" ")[1];
  let newOrder = req.body;

  if (
    newOrder.orderDetail != undefined &&
    newOrder.payment != undefined &&
    newOrder.total != undefined
  ) {
    sql
      .query("SELECT id FROM users WHERE token = ?", {
        replacements: [userToken],
        type: sql.QueryTypes.SELECT,
      })
      .then((user) => {
        if (user.length > 0) {
          let idUser = user[0].id;
          let stateOrder = "nuevo";
          let timeOrder = new Date();

          sql
            .query(
              "INSERT INTO orders (user_id, state, payment, total, time) VALUES (?, ?, ?, ?, ?)",
              {
                replacements: [
                  idUser,
                  stateOrder,
                  newOrder.payment,
                  newOrder.total,
                  timeOrder,
                ],
                type: sql.QueryTypes.INSERT,
              }
            )
            .then((result) => {
              let idPedido = result[0];
              let valuesDetails = "";
              for (order of newOrder.orderDetail) {
                if (valuesDetails == "") {
                  valuesDetails +=
                    "(" + idPedido + ", " + order.id + ", " + order.quant + ")";
                } else {
                  valuesDetails +=
                    ", (" +
                    idPedido +
                    ", " +
                    order.id +
                    ", " +
                    order.quant +
                    ")";
                }
              }

              sql
                .query(
                  "INSERT INTO orderDetails (order_id, product_id, quantity) VALUES " +
                    valuesDetails,
                  { type: sql.QueryTypes.INSERT }
                )
                .then(() => {
                  res.status(200).json({
                    msg: "Your order has been successfully sent",
                    rta: idPedido,
                  });
                });
            });
        } else {
          res
            .status(404)
            .json({ error: "Sorry, there is no user with that identifier" });
        }
      });
  } else {
    res.status(404).json({ error: "Sorry, the order is invalid" });
  }
});

router.get("/", middlewares.verifyToken, middlewares.verifyAdm, (req, res) => {
  sql
    .query(
      'SELECT o.state, o.time, o.id AS orderNumber, CONCAT(od.quantity, "X", (SELECT description FROM products WHERE od.product_id = products.id)) AS description, IF(o.payment = 0, "efectivo", "tarjeta") AS payment, o.total, CONCAT(u.name, " ", u.lastName) AS user, u.address FROM orderDetails AS od JOIN orders AS o ON od.order_id = o.id JOIN users AS u ON o.user_id = u.id',
      { type: sql.QueryTypes.SELECT }
    )
    .then((rows) => {
      if (rows.length > 0) {
        res.status(200).json({ msg: "Delilah Resto orders", rta: rows });
      } else {
        res.status(200).json({ error: "There are no orders listed" });
      }
    });
});

router.get(
  "/:id",
  middlewares.verifyToken,
  middlewares.verifyAdm,
  (req, res) => {
    let idOrder = req.params.id;

    sql
      .query(
        'SELECT o.state, o.time, o.id AS orderNumber, CONCAT(od.quantity, "X", (SELECT description FROM products WHERE od.product_id = products.id)) AS description, IF(o.payment = 0, "efectivo", "tarjeta") AS payment, o.total, CONCAT(u.name, " ", u.lastName) AS user, u.address FROM orderDetails AS od JOIN orders AS o ON od.order_id = o.id JOIN users AS u ON o.user_id = u.id WHERE o.id = ?',
        { replacements: [idOrder], type: sql.QueryTypes.SELECT }
      )
      .then((rows) => {
        if (rows.length > 0) {
          res.status(200).json({ msg: "Delilah Resto orders", rta: rows });
        } else {
          res.status(200).json({ error: "There are no orders listed" });
        }
      });
  }
);

router.put("/:id", middlewares.verifyToken, (req, res) => {
  let userToken = req.headers.authorization.split(" ")[1];
  let idOrder = req.params.id;
  let orderState = req.body.orderState.toLowerCase();

  if (orderState != undefined) {
    sql
      .query("SELECT * FROM users WHERE token = ?", {
        replacements: [userToken],
        type: sql.QueryTypes.SELECT,
      })
      .then((user) => {
        if (user.length > 0) {
          let adminUser = user[0].is_admin;
          if ((!adminUser && orderState == "cancelado") || adminUser) {
            sql
              .query("UPDATE orders SET state = ? WHERE id = ?", {
                replacements: [orderState, idOrder],
                type: sql.QueryTypes.UPDATE,
              })
              .then(() => {
                res.status(200).json({
                  msg: "The order has been successfully updated",
                  rta: idOrder,
                });
              });
          } else {
            res
              .status(404)
              .json({ error: "Permission to change order state denied" });
          }
        } else {
          res
            .status(404)
            .json({ error: "Sorry, there is no user with that identifier" });
        }
      });
  } else {
    res.status(404).json({ error: "The order state is not valid" });
  }
});

module.exports = router;
