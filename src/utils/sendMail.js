require("dotenv").config();

const nodemailer = require("nodemailer");
const config = require("../constant/user.config")


const sendMail = async ( email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "shubhangihingu@gmail.com",
        pass: "iossrpmwotsdsdcg",
      },
    });

    await transporter.sendMail({
      from: "shubhangihingu@gmail.com",
      to: email,
      subject: "Reset Password",
      html: config.greetings + '<p>You requested for reset password, kindly use this <a href="' +
        'http://localhost:3000/resetpassword' + '?token=' + token + '">Reset Password</a> to reset your password</p>',
    });

    console.log("email sent sucessfully");
  } catch (error) {
    console.log("error: ", error.message);
  }
};

module.exports = sendMail;
