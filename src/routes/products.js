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

router.get("/", middlewares.verifyToken, (req, res) => {
  sql
    .query("SELECT * FROM products", { type: sql.QueryTypes.SELECT })
    .then((rowsProducts) => {
      if (rowsProducts.length == 0) {
        res.status(200).json({ error: "There are no products listed" });
      } else {
        res
          .status(200)
          .json({ msg: "Delilah Resto products", rta: rowsProducts });
      }
    });
});

router.get("/:id", middlewares.verifyToken, (req, res) => {
  let idproduct = req.params.id;

  sql
    .query("SELECT * FROM products WHERE id = ?", {
      replacements: [idproduct],
      type: sql.QueryTypes.SELECT,
    })
    .then((rowsProducts) => {
      if (rowsProducts.length == 0) {
        res
          .status(200)
          .json({ error: "There are no products listed with that identifier" });
      } else {
        res
          .status(200)
          .json({ msg: "Delilah Resto products", rta: rowsProducts[0] });
      }
    });
});

router.post("/", middlewares.verifyToken, middlewares.verifyAdm, (req, res) => {
  let newProduct = req.body;
  console.log("newProduct", newProduct);
  if (
    newProduct.name != undefined &&
    newProduct.description != undefined &&
    newProduct.ingredients != undefined &&
    newProduct.price != undefined &&
    newProduct.img != undefined
  ) {
    sql
      .query(
        "INSERT INTO products (name, description, ingredients, price, img) VALUES (?, ?, ?, ?, ?)",
        {
          replacements: [
            newProduct.name,
            newProduct.description,
            newProduct.ingredients,
            newProduct.price,
            newProduct.img,
          ],
          type: sql.QueryTypes.INSERT,
        }
      )
      .then(() => {
        res
          .status(200)
          .json({
            msg: "The product has been successfully created",
            rta: newProduct,
          });
      });
  } else {
    res.status(404).json({ error: "The product is invalid" });
  }
});

router.put(
  "/:id",
  middlewares.verifyToken,
  middlewares.verifyAdm,
  (req, res) => {
    let idproduct = req.params.id;
    let newProduct = req.body;

    sql
      .query("SELECT * FROM products WHERE id = ?", {
        replacements: [idproduct],
        type: sql.QueryTypes.SELECT,
      })
      .then((product) => {
        if (product.length > 0) {
          if (
            newProduct.name != undefined &&
            newProduct.description != undefined &&
            newProduct.ingredients != undefined &&
            newProduct.price != undefined &&
            newProduct.img != undefined
          ) {
            sql
              .query(
                "UPDATE products SET name = ?, description = ?, ingredients = ?, price = ?, img = ? WHERE id = ?",
                {
                  replacements: [
                    newProduct.name,
                    newProduct.description,
                    newProduct.ingredients,
                    newProduct.price,
                    newProduct.img,
                    idproduct,
                  ],
                  type: sql.QueryTypes.UPDATE,
                }
              )
              .then(() => {
                res
                  .status(200)
                  .json({
                    msg: "The product has been successfully edited",
                    rta: newProduct,
                  });
              });
          } else {
            res.status(404).json({ error: "Invalid data" });
          }
        } else {
          res
            .status(404)
            .json({
              error: "There are no products listed with that identifier",
            });
        }
      });
  }
);

router.delete(
  "/:id",
  middlewares.verifyToken,
  middlewares.verifyAdm,
  (req, res) => {
    let idproduct = req.params.id;

    sql
      .query("SELECT * FROM products WHERE id = ?", {
        replacements: [idproduct],
        type: sql.QueryTypes.SELECT,
      })
      .then((product) => {
        if (product.length > 0) {
          sql
            .query("DELETE FROM products WHERE id = ?", {
              replacements: [idproduct],
              type: sql.QueryTypes.DELETE,
            })
            .then(() => {
              res
                .status(200)
                .json({
                  msg: "The product has been successfully deleted",
                  rta: product[0],
                });
            });
        } else {
          res
            .status(200)
            .json({
              error: "There are no products listed with that identifier",
            });
        }
      });
  }
);

module.exports = router;
