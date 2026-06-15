const { body, param, validationResult } = require("express-validator");
const userRepository = require("../repositories/user.repository");
const BadRequestError = require("../errors/BadRequestError");

const handleValidationErrors = (view) => (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render(view, {
      errors: errors.array(),
      input: req.body,
    });
  }

  next();
};

const validateSignup = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3, max: 20 })
    .withMessage("Username must be between 3 and 20 characters")
    .isAlphanumeric()
    .withMessage("Username must contain only letters and numbers")
    .custom(async (value) => {
      const user = await userRepository.findByUsername(value);
      if (user) {
        throw new Error("Username already in use");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("confirmPassword")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords do not match"),
];

const validateLogin = [
  body("username").trim().notEmpty().withMessage("Username is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

const validateFolder = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Folder name is required")
    .isLength({ max: 50 })
    .withMessage("Folder name must be at most 50 characters"),
];

const validateIdParam = (paramName = "id") => [
  param(paramName)
    .isInt({ min: 1 })
    .withMessage(`${paramName} must be a positive integer`)
    .toInt(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new BadRequestError(`Invalid ${paramName}: must be a positive integer`),
      );
    }
    next();
  },
];

module.exports = {
  validateSignup,
  validateLogin,
  validateFolder,
  validateIdParam,
  handleValidationErrors,
};
