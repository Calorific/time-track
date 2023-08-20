import express from 'express'
import bcrypt from 'bcryptjs'
import { validationResult } from 'express-validator'
import { signUpValidations } from '../validations/auth.validations.js'
import { parseErrors } from '../utils/parseErrors.js'
import User from '../models/User.js'
import tokenService from '../services/token.service.js'
import chalk from 'chalk'
import serverErrors from '../serverErrors.js'

const authRouter = express.Router({ mergeParams: true })

authRouter.post('/signUp', [
  ...signUpValidations,
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json(parseErrors(errors))

    try {
      const { email, password } = req.body
      if (await User.findOne({ email }))
        return res.status(409).json({
          errors: { email: serverErrors.userExists }
        })

      const hashedPassword = await bcrypt.hash(password, 12)

      const newUser = await User.create({
        ...req.body,
        password: hashedPassword
      })

      const tokens = await tokenService.generate({ _id: newUser._id })
      await tokenService.save(newUser._id, tokens.refreshToken)

      return res.status(201).json({ ...tokens, userId: newUser._id })
    } catch (e) {
      console.log(chalk.red('[SERVER ERROR]', e.message))
      res.status(500).json({
        errors: { message: serverErrors.internalError }
      })
    }

  }
])

export default authRouter
