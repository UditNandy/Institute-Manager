const Admin = require("../models/admin-model");
const util = require("../utils/util");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { id, password } = req.body;
    const admin = await Admin.findOne({ id: id }).select("+password");
    const passwordMatched = await admin.correctPassword(
      password,
      admin.password
    );
    if (admin && passwordMatched) {
      const accessToken = jwt.sign(
        {
          id: id,
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

exports.verifyToken = async (req, res, next) => {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      const decode = await util.getDecodedToken(req.headers.authorization);
      next();
    } else {
      res
        .status(401)
        .json({ status: "Failed", messages: "User not authorized" });
    }
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
