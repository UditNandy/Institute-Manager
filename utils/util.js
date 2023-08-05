const jwt = require("jsonwebtoken");
const util = require("util");

exports.getDecodedToken = async (jwtToken) => {
  const token = jwtToken.split(" ")[1];
  return await util.promisify(jwt.verify)(token, process.env.JWT_SECRET);
};
