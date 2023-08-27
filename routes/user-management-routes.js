const express = require("express");
const adminController = require("../controllers/admin-controller");
const authController = require("../controllers/auth-controller");
const accountController = require("../controllers/account-controller");
const userManagementController = require("../controllers/user-management-controller");

const userManagementRouter = express.Router();
// userManagementRouter.use(
//   "",
//   userManagementController.updateUserModificationSchema
// );

userManagementRouter.route("").post(userManagementController.signup);

module.exports = userManagementRouter;
