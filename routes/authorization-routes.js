const express = require("express");
const authorizationController = require("../controllers/authorization-controller");
const authController = require("../controllers/auth-controller");

const authorizationRouter = express.Router();

authorizationRouter
  .route("/")
  .get(
    authController.verifyToken,
    authorizationController.fetchUserAuthorizationProfile
  )
  .post(
    authController.verifyToken,
    authorizationController.createAuthorizationProfile
  );

module.exports = authorizationRouter;
