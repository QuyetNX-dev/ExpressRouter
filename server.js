const express = require("express");
const PORT = process.env.PORT || 8080;
const shortid = require("shortid");

const db = require("./db");
const updateRoute = require("./routes/update.route");
const deleteRoute = require("./routes/delete.roure");
const postRoute = require("./routes/post.route");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "pug");
app.set("views", "./views");

const todos = db.get("todo").value();

app.get("/", (req, res) => {
  db.get("todo")
    .forEach((item, index) => {
      item.id = shortid.generate();
      item.stt = index + 1;
    })
    .write();
  res.render("index.pug", {
    todos
  });
});

app.use("/update", updateRoute);
app.use("/delete", deleteRoute);
app.use("/post", postRoute);

app.listen(PORT, () => {
  console.log("Service running on PORT:" + PORT);
});
