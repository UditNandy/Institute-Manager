const Admin = require("../models/admin-model");
const util = require("../utils/util");

exports.signup = async (req, res) => {
  try {
    const newAdmin = await Admin.create(req.body);
    res.status(201).json({
      status: "Success",
      data: { admin: newAdmin },
    });
  } catch (err) {
    res.status(500).json({
      message: "Server didnot respond",
    });
  }
};

exports.fetchAccountDetails = async (req, res) => {
  const decodedToken = await util.getDecodedToken(req.headers.authorization);
  const adminDetails = await Admin.findOne({ id: decodedToken.id });
  res.status(200).json({
    status: "Success",
    data: adminDetails,
  });
};
