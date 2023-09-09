import { check } from 'express-validator'
import serverErrors from '../serverErrors.js'

export const recordValidations = [
  check('description', serverErrors.maxLengthDescription).isLength({ max: 250 }),
  check('description', serverErrors.descriptionRequired).exists().notEmpty(),
  check('time', serverErrors.invalidTime).isInt({ min: 1 }),
  check('time', serverErrors.timeRequired).exists().notEmpty()
]