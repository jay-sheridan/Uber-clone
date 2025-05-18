const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const captainRoute = require("./routes/captain.route");
const connectToDb = require("./db/db");
connectToDb();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", captainRoute);

module.exports = app;