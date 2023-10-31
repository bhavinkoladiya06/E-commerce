const jwt = require("jsonwebtoken");
const USER = require("../model/userModel");

exports.userSecure = async function (req, res, next) {
  try {
    const token = req.headers.authorization;
    // console.log(token);
    if (!token) {
      throw new Error("please attached token");
    }

    const checkToken = await jwt.verify(token, "BK");

    const checkUser = await USER.findById(checkToken.id);
    // console.log(checkUser);

    if (!checkUser) {
      throw new Error("user not Found");
    }

    next();
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};
