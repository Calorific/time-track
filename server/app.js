import express from 'express'
import mongoose from 'mongoose'
import config from 'config'
import chalk from 'chalk'
import cors from 'cors'
import path from 'path'
import router from './routes/index.js'
import cookieParser from 'cookie-parser'
import { fileURLToPath } from 'url'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()

app.use(cookieParser(config.get('cookieSecretKey')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({ credentials: true, origin: 'http://77.223.97.42' }))

const keepCookies = ['cookieConsent', 'theme']

app.use('/api/v1', router)

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.resolve(dirname, 'client')))

  const indexPath = path.resolve(dirname, 'client', 'index.html')

  app.get('*', (req, res) => {
    if (req.cookies.keepLoggedIn !== 'true')
      Object.keys(req.cookies).forEach(c => !keepCookies.includes(c) ? res.clearCookie(c) : 0)

    res.sendFile(indexPath)
  })
}

const PORT = config.get('port') ?? 8080

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'))
    console.log(chalk.green('MongoDB connected'))
    app.listen(PORT, () => console.log(chalk.green(`Server started on port ${PORT}...`)))
  } catch (e) {
    console.log(chalk.red('Error: ' + e.message))
    process.exit(1)
  }
}

start().then()
