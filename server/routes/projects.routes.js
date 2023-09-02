import express from 'express'
import serverErrors from '../serverErrors.js'

import { auth } from '../middleware/auth.middleware.js'
import chalk from 'chalk'
import { validationResult } from 'express-validator'
import { parseErrors } from '../utils/parseErrors.js'
import User from '../models/User.js'
import { projectValidations } from '../validations/project.validation.js'

const projectsRouter = express.Router({
  mergeParams: true
})

projectsRouter.post('/add', auth, [
  ...projectValidations,
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json(parseErrors(errors))

    try {

      const data = await User.findOneAndUpdate(
        { '_id': req.userId },
        {
          $push: {
            'projects': req.body
          }
        },
        { new: true }
      )

      const userProjects = data.projects
      return res.status(201).json(userProjects[userProjects.length - 1])
    } catch (e) {
      if (e.model)
        return res.status(404).json({
          errors: { message: serverErrors.userNotFound }
        })

      console.log(chalk.red('[SERVER ERROR POST /projects/add]', e.message))
      return res.status(500).json({
        errors: { message: serverErrors.internalError }
      })
    }
  }
])

projectsRouter.delete('/remove/:projectId', auth, async (req, res) => {
  try {
    await User.findOneAndUpdate({ _id: req.userId }, {
      $pull: { projects: { _id: req.params.projectId } }
    })
    res.sendStatus(200)
  } catch (e) {
    console.log(e)

    if (e.model)
      return res.status(404).json({
        errors: { message: serverErrors.projectNotFound }
      })
    console.log(chalk.red('[SERVER ERROR DELETE /projects/remove]', e.message))
    return res.status(500).json({
      errors: { message: serverErrors.internalError }
    })
  }
})

export default projectsRouter