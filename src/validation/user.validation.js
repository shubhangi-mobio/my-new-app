const { body, check } = require("express-validator");

exports.LoginValidation = () => {
  return [
    body("email").isEmail().withMessage("please enter valid email"),
    body("password")
      .isString()
      .isLength({ min: 6 })
      .withMessage("password length too short "),
      
  ];
};

exports.UpdateValidation = () => {
  return [
    body("email").isEmail().isString().withMessage("please enter valid email"),
    body("password")
      .isString()
      .isLength({ min: 6 })
      .withMessage("password length too short "),
  ];
};

exports.UpdateValidation = () => {
  return [
    body("email").isEmail().isString().withMessage("please enter valid email"),
    body("password")
      .isString()
      .isLength({ min: 6 })
      .withMessage("password length too short "),
  ];
};

exports.forgotValidation = () => {
  return [
    body("email").isEmail().isString().withMessage("please enter  email"),
  ];
};

exports.changeValidation = () => {
  return [
    body("password")
      .isString()
      .isLength({ min: 6 })
      .withMessage("password length too short "),
    body("newPassword")
      .isString()
      .isLength({ min: 6 })
      .withMessage("password length too short "),
    body("confirmPassword")
      .isString()
      .isLength({ min: 6 })
      .withMessage("password length too short "),
  ];
};
exports.resetValidation = () => {
  return [
    body("newPassword")
      .isString()
      .isLength({ min: 6 })
      .withMessage("password length too short "),
    body("confirmPassword")
      .isString()
      .isLength({ min: 6 })
      .withMessage("password length too short "),
  ];
}