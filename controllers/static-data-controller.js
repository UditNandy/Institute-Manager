const AllAuths = require("../models/static-data-model");

exports.createAllAuths = async (req, res) => {
  try {
    const temp = await AllAuths.countDocuments({});
    if (!temp) {
      const allAuths = await AllAuths.create(req.body);
      res.status(201).json({ status: "Success", data: allAuths });
    } else {
      res
        .status(400)
        .json({ status: "Failed", message: "Auth data already present" });
    }
  } catch (err) {
    res.status(400).json({ status: "Failed", message: err });
  }
};

exports.fetchAllAuths = async (req, res) => {
  try {
    const allAuth = await AllAuths.findOne();
    res.status(200).json({ status: "Success", data: allAuth });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
