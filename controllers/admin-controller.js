const Admin = require("../models/admin-model");
const AuthorizationProfile = require("../models/authorization-model");

exports.signup = async (req, res) => {
  try {
    const authorizationProifle = await AuthorizationProfile.findOne({
      profileName: req.body.authorizationProfile,
    });
    if (!authorizationProifle) {
      res.status(400).json({ message: "Authorization Profile Doesnot exist" });
    }
    const newAdmin = await Admin.create(req.body);
    res.status(201).json({
      status: "Success",
      data: { admin: newAdmin },
    });
  } catch (err) {
    res.status(500).json({
      message: "Server didnot respond",
      err: err,
    });
  }
};
