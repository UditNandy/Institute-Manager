const express = require("express");
const authorizationController = require("../controllers/authorization-controller");
const authController = require("../controllers/auth-controller");

const authorizationRouter = express.Router();

authorizationRouter
  .route("/")
  .get(
    authController.verifyToken,
    authorizationController.fetchAuthorizationProfiles
  )
  .post(
    authController.verifyToken,
    authorizationController.createAuthorizationProfile
  )
  .put(
    authController.verifyToken,
    authorizationController.updateAuthorizationProfile
  )
  .delete(
    authController.verifyToken,
    authorizationController.deleteAuthorizationProfile
  );

module.exports = authorizationRouter;
