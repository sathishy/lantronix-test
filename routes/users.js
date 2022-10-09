'use strict'
const express = require('express')
const expressValidator = require('express-validator')
const router = express.Router()

const check = expressValidator.check

const RegisterRules = [

  check('email')
    .isEmail().withMessage('Invalid email address!'),

  check('password').not().isEmpty().withMessage('Please provide password'),

  check('username')
    .not()
    .isEmpty()
    .trim()
    .escape()
    .isLength({ min: 5, max: 60 }).withMessage('Username length should be in between 5 to 60 characters.'),

];

const LoginRules = [

  check('username', 'Please provide Username')
    .not()
    .isEmpty()
    .trim()
    .escape(),

  check('password', 'Please provide a valid password').not().isEmpty()

];

const validationsResult = (req, res, next) => {
  const errors = expressValidator.validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}

const loginController = require('../controllers/auth/loginController')
const registerController = require('../controllers/auth/registerController')

/* User Login. */
router.post('/login', LoginRules, validationsResult, loginController)

/* User Registration. */
router.post('/register', RegisterRules, validationsResult, registerController)

module.exports = router;
