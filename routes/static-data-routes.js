const express = require("express");
const staticDataController = require("../controllers/static-data-controller");
const authController = require("../controllers/auth-controller");

const staticDataRouter = express.Router();

staticDataRouter
  .route("/")
  .get(authController.verifyToken, staticDataController.fetchAllAuths)
  .post(authController.verifyToken, staticDataController.createAllAuths);

module.exports = staticDataRouter;
