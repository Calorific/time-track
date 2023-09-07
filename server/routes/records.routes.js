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
        { '_id': req.userId, projects: { '$elemMatch': { _id: req.body.projectId } } },
        {
          $push: {
            'projects.$.records': { timeSpent: time, description }
          }
        },
        { new: true }
      )

      if (!data)
        return res.status(404).json(parseErrors(serverErrors.projectNotFound, false))

      const newRecord = data.projects.find(p => p._id.toString() === projectId).records.pop()
      return res.status(201).json(newRecord)
    } catch (e) {
      console.log(chalk.red('[SERVER ERROR POST /records/add]', e.message))
      return res.status(500).json(parseErrors(serverErrors.internalError, false))
    }
  }
])

recordsRouter.delete('/remove/:projectId/:recordId',auth, async (req, res) => {
  try {
    await User.findOneAndUpdate(
        { '_id': req.userId, projects: { '$elemMatch': { _id: req.params.projectId } } },
        {
          $pull: {
            'projects.$.records': { '_id': req.params.recordId }
          }
        }
    )
    return res.sendStatus(200)
  } catch (e) {
    console.log(chalk.red('[SERVER ERROR DELETE /projects/remove]', e.message))
    return res.status(500).json(parseErrors(serverErrors.internalError, false))
  }
})

export default recordsRouter