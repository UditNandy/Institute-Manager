const express = require("express");
const adminController = require("../controllers/admin-controller");

const adminRouter = express.Router();

adminRouter.route("/login").post(adminController.login);
adminRouter.route("/signup").post(adminController.signup);

module.exports = adminRouter;
