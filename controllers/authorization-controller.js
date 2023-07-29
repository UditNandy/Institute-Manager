const AuthorizationProfile = require("../models/authorization-model");
const util = require("../utils/util");

exports.createAuthorizationProfile = async (req, res) => {
  try {
    const newAuthorizationProfile = await AuthorizationProfile.create(req.body);
    res.status(201).json({ status: "Success", data: newAuthorizationProfile });
  } catch (err) {
    res.status(400).json({ status: "Failed", message: err });
  }
};

exports.fetchUserAuthorizationProfile = async (req, res) => {
  try {
    const decode = await util.getDecodedToken(req.headers.authorization);
    const authorizationProfile = await AuthorizationProfile.findOne({
      profileName: decode.authorizationProfile,
    });
    res.status(200).json({ status: "Success", data: authorizationProfile });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
