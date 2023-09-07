import express from 'express'
import serverErrors from '../serverErrors.js'
import User from '../models/User.js'
import { clearUserFields } from '../utils/clearUserFields.js'
import { auth } from '../middleware/auth.middleware.js'
import chalk from 'chalk'
import { check, validationResult } from 'express-validator'
import { parseErrors } from '../utils/parseErrors.js'
import { hasDuplicates } from '../utils/hasDuplicates.js'

const userRouter = express.Router({
  mergeParams: true
})

userRouter.get('/data', auth, async (req, res) => {
  try {
    const dbUser = await User.findOne({ _id: req.userId })
    const user = clearUserFields(dbUser)

    return res.status(200).json(user)
  } catch (e) {
    return res.status(404).json(parseErrors(serverErrors.userNotFound, false))
  }
})

userRouter.patch('/', auth, [
  check('types.*', serverErrors.maxLengthProjectType).isLength({ max: 30 }).optional(),
  check('types', serverErrors.incorrectTypes).isArray({ min: 1}).optional(),
  check('currentProject', serverErrors.invalidProjectId).isMongoId().optional(),
  check('theme', serverErrors.invalidTheme).custom(theme => ['dark', 'light'].includes(theme)).optional(),
  async (req, res) => {
    const result = validationResult(req)

    if (!result.isEmpty()) {
      if (result.errors.find(e => e.path === 'types'))
        return res.status(400).json(parseErrors(result))

      return res.status(400).json(parseErrors(result.errors[0].msg, false))
    }

    try {
      const { currentProject, theme, types } = req.body

      const user = await User.findOne({ _id: req.userId })
      if (!user)
        return res.status(409).json(parseErrors(serverErrors.userNotFound, false))

      if (currentProject)
        user.currentProject = currentProject
      if (theme)
        user.theme = theme

      if (types) {
        if (hasDuplicates(types))
          return res.status(409).json({ errors: { formErrors: { type: serverErrors.typeExists } } })
        user.projectTypes = types
      }

      const updatedUser = await user.save()
      return res.status(200).json(updatedUser)
    } catch (e) {
      console.log(chalk.red('[SERVER ERROR PATCH /user/]', e.message))
      return res.status(500).json(parseErrors(serverErrors.internalError, false))
    }
  }
])

export default userRouter