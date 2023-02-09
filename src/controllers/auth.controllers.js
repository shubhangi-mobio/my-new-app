require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const sendMail = require("../utils/sendMail");
const logger = require("../logger/logger");
const { validationResult } = require('express-validator');


/**
 * @method - POST
 * @param - /login
 * @description - User Login

 */

exports.UserLogin = async (req, res) => {
  try {
    let Validate = validationResult(req);
    if (!Validate.isEmpty()) {
      return res.status(400).json(Validate.array()[0].msg);
    }
    const email = req.body.email;

    const password = req.body.password;
    const userData = await User.findOne({ email: email })
    if (userData) {
      const token = jwt.sign({ id: userData._id }, process.env.JWT_SECRET);
      const passwordHash = await bcrypt.hash(password, 10);
      // const passwordMatch = await bcrypt.compare(password, userData.password);

      if (passwordHash) {
        const userResult = {
          _id: userData._id,
          email: userData.email,
          mobileNumber:userData.mobileNumber,
          password: passwordHash,
          token: token
        }
        res.status(200).send({
          success: true,
          msg: 'User login',
          data: userResult
        });
      } else {
        res.status(400).send({ success: false, message: "login details  invalid" });
      }
    } else {
      res.status(400).send({ success: false, message: "check email address" });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error.message);
  }
}

/**
 * @method - GET
 * @param - /profile
 * @description - User Profile
 */

exports.UserProfile = async (req, res) => {
  try {
    const id = req.body.id

    const data = await User.findOne({ _id: id })
    if (!data) {
      res.status(400).send({ error: "User Not Found" });
    }
    const newData = {
      "mobileNumber":data.mobileNumber,
      "email": data.email,
    }
   return res.status(200).json({ Data: newData })
  } catch (err) {
   return res.status(500).send({
      error_message: err.message
    });
  }
};


/**
 * @method - PUT
 * @param - /update
 * @description - Update Profile
 */

exports.UpdateProfile = async (req, res) => {
  let result = await User.findOne({ id: req.params.id })
  if (result) {
    res.send(result)
  } else {
    res.send({ "result": "No User Found." })
  }
}

/**
 * @method - POST
 * @param - /logout
 * @description - Logout User
 */
// exports.logoutUser = async (req, res) => {
//   res.clearCookie('token');
//   res.json({success: true,message:'user logout'})
// }

exports.logoutUser = async (req, res) => {
  if (req.headers && req.headers.authorization) {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(400).json({ success: false, message: "Authorization failed" });
    }
    let tokenData = req.user.token
    await User.findByIdAndUpdate(req.user._id, tokenData)
    res.status(200).json({ success: true, message: "users was logout." });
  }
}






