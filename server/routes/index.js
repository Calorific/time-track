import express from 'express'
import authRouter from './auth.routes.js'
import userRouter from './user.routes.js'
import recordsRouter from './records.routes.js'

const router = express.Router({ mergeParams: true })

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/records', recordsRouter)

export default router