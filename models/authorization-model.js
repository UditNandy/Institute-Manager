const mongoose = require("mongoose");

const authorizationProfileSchema = new mongoose.Schema({
  profileName: {
    type: String,
    required: [true, "profile name must not be null"],
    unique: true,
  },
  profiles: {
    type: [],
    required: true,
  },
});

const AuthorizationProfile = mongoose.model(
  "AuthorizationProfile",
  authorizationProfileSchema
);

module.exports = AuthorizationProfile;
