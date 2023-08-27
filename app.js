const express = require("express");
const adminRouter = require("./routes/admin");
const authorizationRouter = require("./routes/authorization-routes");
const staticDataRouter = require("./routes/static-data-routes");
const userManagementRouter = require("./routes/user-management-routes");

const app = express();
app.use(express.json());

app.use("/instituteManager/v1/admin", adminRouter);
app.use("/instituteManager/v1/authorization", authorizationRouter);
app.use("/instituteManager/v1/staticData", staticDataRouter);
app.use("/instituteManager/v1/userManagement", userManagementRouter);

module.exports = app;
