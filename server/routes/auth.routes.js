import express from 'express'
import bcrypt from 'bcryptjs'
import { validationResult } from 'express-validator'
import { logInValidations, signUpValidations } from '../validations/auth.validations.js'
import { parseErrors } from '../utils/parseErrors.js'
import User from '../models/User.js'
import tokenService from '../services/token.service.js'
import chalk from 'chalk'
import serverErrors from '../serverErrors.js'
import config from 'config'
import { clearUserFields } from '../utils/clearUserFields.js'

const authRouter = express.Router({
  mergeParams: true,
})

authRouter.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Methods', 'POST')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  next()
})

authRouter.post('/signup', [
  ...signUpValidations,
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json(parseErrors(errors))

    try {
      const { email, password } = req.body
      if (await User.findOne({ email }))
        return res.status(409).json({
          errors: { formErrors: { email: serverErrors.userExists } }
        })

      const hashedPassword = await bcrypt.hash(password, 12)

      const newUser = await User.create({
        ...req.body,
        password: hashedPassword,
        projectTypes: ['Задача'],
        projects: [
          {
            title: 'Test',
            type: 'Задача',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum molestiae nostrum reprehenderit. Accusamus aliquid doloribus iure nesciunt nihil recusandae, rem.',
            records: [
              { description: 'Test description', timeSpent: 3600 }
            ]
          },
          {
            title: 'Second project',
            type: 'Задача',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, possimus?',
            records: [
              { description: 'Test description', timeSpent: 5145 }
            ]
          }
        ]
      })
      const accessToken = await tokenService.generateAccessToken({ _id: newUser._id.toString() })
      const refreshToken = await tokenService.generateRefreshToken({ _id: newUser._id.toString() })
      await tokenService.save(newUser._id.toString(), refreshToken)

      res.cookie('accessToken', accessToken, { domain: 'localhost', path: '/', maxAge: +config.get('accessKeyExpiresMS') })
      res.cookie('refreshToken', refreshToken, { httpOnly: true, domain: 'localhost', path: '/' })
      res.cookie('keepLoggedIn', true, { domain: 'localhost', path: '/' })

      const user = clearUserFields(newUser)

      return res.status(201).json(user)
    } catch (e) {
      console.log(chalk.red('[SERVER ERROR POST /auth/signup]', e.message))
      return res.status(500).json({
        errors: { message: serverErrors.internalError }
      })
    }
  }
])

authRouter.post('/login', [
  ...logInValidations,
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json(parseErrors(errors))

    try {
      const { email, password, keepLoggedIn } = req.body
      const dbUser = await User.findOne({ email })

      if (!dbUser)
        return res.status(404).json({
          errors: { formErrors: { email: serverErrors.userNotFound }}
        })

      const isValidPassword = await bcrypt.compare(password, dbUser.password)
      
      if (!isValidPassword)
        return res.status(401).json({
          errors: { formErrors: { password: serverErrors.wrongPassword }}
        })

      if (keepLoggedIn)
        res.cookie('keepLoggedIn', true, { domain: 'localhost', path: '/' })

      const accessToken = await tokenService.generateAccessToken({ _id: dbUser._id })
      res.cookie('accessToken', accessToken, { domain: 'localhost', path: '/', maxAge: +config.get('accessKeyExpiresMS') })

      const { refreshToken } = await tokenService.findToken({ _id: dbUser._id.toString() })

      res.cookie('refreshToken', refreshToken, { httpOnly: true, domain: 'localhost', path: '/' })

      const user = clearUserFields(dbUser)
      return res.status(200).json(user)
    } catch (e) {
      console.log(chalk.red('[SERVER ERROR POST /auth/login]', e.message))
      return res.status(500).json({
        errors: { message: serverErrors.internalError }
      })
    }
  }
])

authRouter.post('/logout', async (req, res) => {
  try {
    res.clearCookie('refreshToken')
    res.clearCookie('accessToken')
    res.clearCookie('keepLoggedIn')

    res.status(200).send()
  } catch (e) {
    console.log(chalk.red('[SERVER ERROR POST /auth/logout]', e.message))
    return res.status(500).json({
      errors: { message: serverErrors.internalError }
    })
  }
})


authRouter.post('/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.cookies
    const data = await tokenService.validateRefreshToken(refreshToken)
    const dbToken = await tokenService.findToken({ _id: data._id })
    
    const isValidToken = refreshToken && data && data._id === dbToken?.user?.toString()

    if (!isValidToken)
      return res.status(401).json({
        error: { message: serverErrors.unauthorized }
      })

    const accessToken = await tokenService.generateAccessToken({ _id: data._id })

    res.cookie('accessToken', accessToken, { domain: 'localhost', path: '/' })
    return res.status(201).json({})
  } catch (e) {
    console.log(chalk.red('[SERVER ERROR POST /auth/refresh]', e.message))
    return res.status(500).json({
      errors: { message: serverErrors.internalError }
    })
  }
})

export default authRouter
