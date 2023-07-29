const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, "Id must not be null"],
    unique: true,
  },
  emailId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  authorizationProfile: {
    type: String,
    required: [true, "authorizationProfile must not be null"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: true,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
    },
  },
});

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
});

adminSchema.methods.correctPassword = async function (
  candidatePassword,
  adminPassword
) {
  return await bcrypt.compare(candidatePassword, adminPassword);
};

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
