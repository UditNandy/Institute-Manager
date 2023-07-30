const mongoose = require("mongoose");

const allAuthSchema = new mongoose.Schema({
  profiles: {
    type: [],
    required: true,
  },
});

const AllAuths = mongoose.model("AllAuths", allAuthSchema);

module.exports = AllAuths;
