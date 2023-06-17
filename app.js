const express = require("express");
const adminRouter = require("./routes/admin");

const app = express();
app.use(express.json());

app.use("/v1/admin", adminRouter);

module.exports = app;
