import express from 'express'
import serverErrors from '../serverErrors.js'

import { auth } from '../middleware/auth.middleware.js'
import chalk from 'chalk'
import { recordValidations } from '../validations/record.validation.js'
import { validationResult } from 'express-validator'
import { parseErrors } from '../utils/parseErrors.js'
import User from '../models/User.js'

const recordsRouter = express.Router({
  mergeParams: true
})

recordsRouter.post('/add', auth, [
  ...recordValidations,
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json(parseErrors(errors))

    try {
      const { time, description, projectId } = req.body

      const data = await User.findOneAndUpdate(
        { '_id': req.userId, projects: { '$elemMatch': { _id: projectId } } },
        {
          $push: {
            'projects.$.records': { timeSpent: time, description }
          }
        }
      )
      const newRecord = data.projects.find(p => p._id.toString() === projectId).records.pop()
      return res.status(201).json(newRecord)
    } catch (e) {
      if (e.model)
        return res.status(404).json({
          errors: { message: serverErrors.projectNotFound }
        })

      console.log(chalk.red('[SERVER ERROR POST /records/add]', e.message))
      return res.status(500).json({
        errors: { message: serverErrors.internalError }
      })

    }
  }
])

export default recordsRouter