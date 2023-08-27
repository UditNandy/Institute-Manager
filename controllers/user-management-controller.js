const Student = require("../models/user-management-model");

exports.signup = async (req, res) => {
  try {
    const existingStudent = await Student.find({
      "credentials.rollNumber": req.body.credentials.rollNumber,
    });
    if (existingStudent.length) {
      res
        .status(400)
        .json({ status: "Failed", message: "RollNumber already exists" });
    } else {
      const newStudent = await Student.create(req.body);
      res.status(201).json({
        status: "Success",
        data: { student: newStudent },
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Server didnot respond",
      err: err,
    });
  }
};
