const express = require("express");
const adminController = require("../controllers/admin-controller");
const authController = require("../controllers/auth-controller");
const accountController = require("../controllers/account-controller");

const adminRouter = express.Router();

adminRouter.route("/login").post(authController.login);
adminRouter.route("/signup").post(adminController.signup);

adminRouter
  .route("/self/account")
  .get(authController.verifyToken, accountController.fetchAccountDetails);

adminRouter
  .route("/self/authorization")
  .get(
    authController.verifyToken,
    accountController.fetchUserAuthorizationProfile
  );
module.exports = adminRouter;
