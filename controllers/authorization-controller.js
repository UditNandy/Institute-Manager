const AuthorizationProfile = require("../models/authorization-model");
const Admin = require("../models/admin-model");

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

exports.deleteAuthorizationProfile = async (req, res) => {
  try {
    if (
      !(await Admin.findOne({ authorizationProfile: req.body.profileName }))
    ) {
      try {
        await AuthorizationProfile.deleteMany({
          profileName: req.body.profileName,
        });
        res.status(200).json({
          status: "Success",
          message: `${req.body.profileName} deleted successfully`,
        });
      } catch (authorizationErr) {
        res
          .status(500)
          .json({ status: "Failed", message: "Something went wrong" });
      }
    } else {
      res.status(400).json({
        status: "Failed",
        message: `${req.body.profileName} is already associated with some users`,
      });
    }
  } catch (err) {
    res.status(500).json({ status: "Failed", message: "Something went wrong" });
  }
};

exports.updateAuthorizationProfile = async (req, res) => {
  try {
    if (!(await Admin.findOne({ profileName: req.body.profileName }))) {
      try {
        let updatedAuthorizationProfile;
        if (req.body.newProfileName) {
          updatedAuthorizationProfile = await AuthorizationProfile.updateOne(
            {
              profileName: req.body.profileName,
            },
            {
              profileName: req.body.newProfileName,
              profiles: req.body.profiles,
            }
          );
        } else {
          updatedAuthorizationProfile = await AuthorizationProfile.updateOne(
            {
              profileName: req.body.profileName,
            },
            {
              profiles: req.body.profiles,
            }
          );
        }
        res.status(200).json({
          status: "Success",
          message: "Authorization profile updated",
        });
      } catch (authorizationErr) {
        res
          .status(500)
          .json({ status: "Failed", message: "Something went wrong" });
      }
    } else {
      res.status(400).json({
        status: "Failed",
        message: `${req.body.profileName} cant be modified as it is associated with some user`,
      });
    }
  } catch (err) {
    res.status(500).json({ status: "Failed", message: "Something went wrong" });
  }
};
