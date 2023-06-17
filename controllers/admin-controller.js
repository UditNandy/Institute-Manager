const Admin = require("../models/admin-model");
const jwt = require("jsonwebtoken");

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

exports.login = async (req, res) => {
  try {
    const { adminId, password } = req.body;
    const admin = await Admin.findOne({ adminId: adminId }).select("+password");
    const passwordMatched = await admin.correctPassword(
      password,
      admin.password
    );
    if (admin && passwordMatched) {
      const accessToken = jwt.sign(
        {
          adminId: adminId,
          emailId: admin.emailId,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRY,
        }
      );
      res.json({
        status: "Success",
        accessToken,
      });
    } else {
      res
        .status(401)
        .json({ status: "Failed", message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
