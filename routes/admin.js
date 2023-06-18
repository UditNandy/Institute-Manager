const express = require("express");
const adminController = require("../controllers/admin-controller");
const authController = require("../controllers/auth-controller");

const adminRouter = express.Router();

adminRouter.route("/login").post(authController.login);
adminRouter.route("/signup").post(adminController.signup);

adminRouter
  .route("/self/account")
  .get(authController.verifyToken, adminController.fetchAccountDetails);

module.exports = adminRouter;
