const express = require("express");
const authorizationController = require("../controllers/authorization-controller");
const authController = require("../controllers/auth-controller");

const authorizationRouter = express.Router();

authorizationRouter
  .route("/")
  .post(
    authController.verifyToken,
    authorizationController.createAuthorizationProfile
  );

module.exports = authorizationRouter;
