import express from 'express'
import mongoose from 'mongoose'
import config from 'config'
import chalk from 'chalk'
import cors from 'cors'
import path from 'path'
import Token from './models/Token.js'
import router from './routes/index.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use('/api/v1', router)

const PORT = config.get('port') ?? 8080

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.resolve(__dirname, 'client')))

  const indexPath = path.resolve(__dirname, 'client', 'index.html')

  app.get('*', (req, res) => {
    res.sendFile(indexPath)
  })
}

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
