const express = require("express");
const authController = require("../controllers/auth-controller");
const userManagementController = require("../controllers/user-management-controller");

const userManagementRouter = express.Router();

userManagementRouter
  .route("/student")
  .post(authController.verifyToken, userManagementController.signup);

module.exports = userManagementRouter;
