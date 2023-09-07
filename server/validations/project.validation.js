import { check } from 'express-validator'
import serverErrors from '../serverErrors.js'


export const projectValidations = [
  check('type', serverErrors.maxLengthProjectType).isLength({ max: 25 }),
  check('type', serverErrors.typeRequired).exists().notEmpty(),
  check('description', serverErrors.maxLengthDescription).isLength({ max: 250 }),
  check('description', serverErrors.descriptionRequired).exists().notEmpty(),
  check('title', serverErrors.maxLengthProjectTitle).isLength({ max: 50 }),
  check('title', serverErrors.projectTitleRequired).exists().notEmpty()
]