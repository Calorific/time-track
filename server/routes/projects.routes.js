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
      const user = await User.findOne({ _id: req.userId })
      if (!user)
        return res.status(409).json(parseErrors(serverErrors.userNotFound, false))

      const projectExists = user.projects.find(p => p.title === req.body.title)
      if (projectExists)
        return res.status(409).json(parseErrors({ errors: { title: serverErrors.projectExists } }))

      user.projects.push(req.body)

      const data = await user.save()

      const userProjects = data.projects
      return res.status(201).json(userProjects[userProjects.length - 1])
    } catch (e) {
      console.log(chalk.red('[SERVER ERROR POST /projects/add]', e.message))
      return res.status(500).json(parseErrors(serverErrors.internalError, false))
    }
  }
])

projectsRouter.post('/edit', auth, [
  ...projectValidations,
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json(parseErrors(errors))

    try {
      const { projectId, ...project } = req.body

      const user = await User.findOne({ _id: '64ef62b532a1e022ec550eed' })
      if (!user)
        return res.status(409).json(parseErrors(serverErrors.userNotFound, false))

      const projectIdx = user.projects.findIndex(p => p._id.toString() === projectId)
      if (projectIdx === -1)
        return res.status(409).json(parseErrors({ errors: { title: serverErrors.projectNotFound } }))

      const duplicateTitle = user.projects.some((p, i) => p.title === project.title && i !== projectIdx)
      if (duplicateTitle)
        return res.status(409).json(parseErrors({ errors: { title: serverErrors.projectExists } }))

      user.projects[projectIdx].title = project.title
      user.projects[projectIdx].description = project.description
      user.projects[projectIdx].type = project.type

      const updatedUser = await user.save()

      return res.status(200).json({ projectIdx, project: updatedUser.projects[projectIdx] })
    } catch (e) {
      console.log(chalk.red('[SERVER ERROR POST /projects/edit]', e.message))
      return res.status(500).json(parseErrors(serverErrors.internalError, false))
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
    console.log(chalk.red('[SERVER ERROR DELETE /projects/remove]', e.message))
    return res.status(500).json(parseErrors(serverErrors.internalError, false))
  }
})

export default projectsRouter