import { check } from 'express-validator'
import serverErrors from '../serverErrors.js'

export const signUpValidations = [
  check('name', serverErrors.invalidName).matches(/^[A-Za-z\s]+$/),
  check('name', serverErrors.maxLengthName).isLength({ max: 25 }),
  check('email', serverErrors.invalidEmail).isEmail(),
  check('email', serverErrors.maxLengthEmail).isLength({ max: 50 }),
  check('password', serverErrors.minLengthPassword).isLength({ min: 8 }),
  check('password', serverErrors.maxLengthPassword).isLength({ max: 25 }),
  check('agree', serverErrors.agreementRequired).custom(agree => agree)
]

