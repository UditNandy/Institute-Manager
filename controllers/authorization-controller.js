const AuthorizationProfile = require("../models/authorization-model");

exports.createAuthorizationProfile = async (req, res) => {
  try {
    const newAuthorizationProfile = await AuthorizationProfile.create(req.body);
    res.status(201).json({ status: "Success", data: newAuthorizationProfile });
  } catch (err) {
    res.status(400).json({ status: "Failed", message: err });
  }
};

exports.fetchAuthorizationProfiles = async (req, res) => {
  try {
    const authorizationProfiles = await AuthorizationProfile.find();
    res.status(200).json({ status: "Success", data: authorizationProfiles });
  } catch (err) {
    res.status(400).json({ status: "Failed", message: err });
  }
};
