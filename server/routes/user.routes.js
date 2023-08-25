import express from 'express'
import serverErrors from '../serverErrors.js'
import User from '../models/User.js'
import { clearUserFields } from '../utils/clearUserFields.js'
import { auth } from '../middleware/auth.middleware.js'

const userRouter = express.Router({
  mergeParams: true
})

userRouter.get('/data', auth, async (req, res) => {
  try {
    const dbUser = await User.findOne({ _id: req.userId })
    const user = clearUserFields(dbUser)

    return res.status(200).json(user)
  } catch (e) {
    return res.status(404).json({
      errors: { message: serverErrors.notFound }
    })
  }
})

export default userRouter