const USER = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createUser = async function (req, res, next) {
  try {
    var { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw new Error("please fillUp all filds");
    }
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const data = await USER.create(req.body);
    const token = await jwt.sign({ id: data._id }, "BK");

    res.status(201).json({
      message: "user Account create successfull",
      data,
      token,
    });
  } catch (error) {
    res.status(201).json({
      status: "Fails",
      message: error.message,
    });
  }
};

exports.loginUser = async function (req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("please enter email and password");
    }
    const data = await USER.findOne({email:email});
    if (!data) {
        throw new Error("email invalid");
    }
    const checkPass = await bcrypt.compare(req.body.password, data.password);

    if(!checkPass){
        throw new Error('password invalid')
    }
    const token = await jwt.sign({ id: data._id }, "BK");
    res.status(200).json({
        message:`Welcome,${data.name}`,
        data,
        token
    })
  } catch (error) {
     res.status(404).json({
        status:'Fail',
       message: error.message,
     });
  }
};
