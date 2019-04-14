const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const passport = require("passport");
const users = require("./routes/api/users");
const skills = require("./routes/api/skills");
const match = require("./routes/api/match");

const app = express();
//body-parser config
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//db config
const db = require("./config/keys").mongoURI;

//connect to mongoDB
mongoose
  .connect(db)
  .then(() => console.log("mongodb connected"))
  .catch(err => console.log(err));
app.get("/", (req, res) => res.send("working"));

//passport config
require("./config/passport")(passport);

//nodemailer config

//routes
app.use("/api/users", users);
app.use("/api/skills", skills);
app.use("/api/match", match);

//server static assets if in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("/client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server is running on port no -> ${port}`));
