import { check } from 'express-validator'
import serverErrors from '../serverErrors.js'

export const recordValidations = [
  check('description', serverErrors.maxLengthEmail).isLength({ max: 50 }),
  check('time', serverErrors.invalidTime).isInt({ min: 1 }),
  check('time', serverErrors.timeRequired).exists().notEmpty()
]