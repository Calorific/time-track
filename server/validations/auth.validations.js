import { check } from 'express-validator'
import serverErrors from '../serverErrors.js'

export const logInValidations = [
  check('email', serverErrors.maxLengthEmail).isLength({ max: 50 }),
  check('email', serverErrors.invalidEmail).isEmail(),
  check('email', serverErrors.emailRequired).exists().notEmpty(),
  check('password', serverErrors.minLengthPassword).isLength({ min: 8 }),
  check('password', serverErrors.maxLengthPassword).isLength({ max: 25 }),
]

export const signUpValidations = [
  check('name', serverErrors.maxLengthName).isLength({ max: 25 }),
  check('name', serverErrors.invalidName).matches(/^[A-Za-z\s]+$/),
  check('name').exists().notEmpty().withMessage(serverErrors.nameRequired),
  ...logInValidations,
  check('agree', serverErrors.agreementRequired).custom(agree => agree)
]

