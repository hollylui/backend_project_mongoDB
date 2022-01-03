const { body, validationResult } = require("express-validator");

//! register -----------------------------------------------------------
module.exports.register = [
  //   name -----------------
  body("name")
    .trim()
    .isAlpha("en-US", { ignore: " " })
    .withMessage("**Only letters are allowed in Name."),
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ title: "Validation errors name", error: errors });
    }
    next();
  },

  body("username")
    .trim()
    .custom((value) => !/\s/.test(value))
    .withMessage("**No spaces are allowed in Username"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ title: "Validation errors name", error: errors });
    }
    next();
  },

  //email ---------------------

  body("email").trim().isEmail().withMessage("**This is an invalid email."),
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ title: "Validation errors email", error: errors });
    }
    next();
  },

  //password ---------------------

  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("**Minimum 6 characters in Password."),
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ title: "Validation errors password", error: errors });
    }
    next();
  },
];

//! login -----------------------------------------------------------
module.exports.login = [
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("**Minimum 6 characters in password."),
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ title: "Validation errors password", error: errors });
    }
    next();
  },
];
