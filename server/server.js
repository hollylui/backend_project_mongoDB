const dotenv = require("dotenv").config();
const cors = require("cors");
const path = require("path");
const express = require("express");
const app = express();
const passport = require("passport");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const usersRoute = require("./routes/users/usersRoute");
const newsRoute = require("./routes/news/newsRoute");

const { PORT, DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;
const port = PORT || 4000;

//! global middleware --------------------------------
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(express());
app.use(express.json());
app.use(cookieParser());
app.disable("x-powered-by");

//! passport ----------------------------------------
const initializePassport = require("./passport/passport-config");
initializePassport(passport);

//! MongoDB database ---------------------------------
const dbURL = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;
mongoose
  .connect(dbURL)
  .then(() => console.log("Databse is connected."))
  .catch((err) => () => console.log(err));

//! routes ------------------------------------------
app.use("/users", usersRoute);
app.use("/news", newsRoute);

//! connect to frontend: client ---------------------
app.use(express.static(path.join(__dirname, "client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
