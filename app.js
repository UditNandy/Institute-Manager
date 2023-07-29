const express = require("express");
const adminRouter = require("./routes/admin");
const authorizationRouter = require("./routes/authorization-routes");

const app = express();
app.use(express.json());

app.use("/instituteManager/v1/admin", adminRouter);
app.use("/instituteManager/v1/authorization", authorizationRouter);

module.exports = app;
