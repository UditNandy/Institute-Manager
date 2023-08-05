const Admin = require("../models/admin-model");
const AuthorizationProfile = require("../models/authorization-model");
const util = require("../utils/util");

exports.fetchAccountDetails = async (req, res) => {
  const decodedToken = await util.getDecodedToken(req.headers.authorization);
  const adminDetails = await Admin.findOne({ id: decodedToken.id });
  res.status(200).json({
    status: "Success",
    data: adminDetails,
  });
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
