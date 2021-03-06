var express = require("express");
var router = express.Router();

const db = require("../db");

router.get("/:id", (req, res) => {
  let id = req.params.id;
  res.render("book/delete", {
    id
  });
});

router.get("/:id/oke", (req, res) => {
  var id = req.params.id;
  db.get("todo")
    .remove({ id: id })
    .write();
  res.redirect("/");
});

module.exports = router;
