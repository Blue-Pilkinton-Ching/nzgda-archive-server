import express, { Request, Response } from 'express'
import cors from 'cors'
import https from 'https'
import fs from 'fs'

import multer from 'multer'

const app = express()
const PORT = process.env.PORT || 3002

// SSL certs files
const privateKey = fs.readFileSync(
  '/home/ubuntu/websites/ssl/server.key',
  'utf8'
)
const certificate = fs.readFileSync(
  '/home/ubuntu/websites/ssl/server.crt',
  'utf8'
)
const credentials = { key: privateKey, cert: certificate }

app.use(
  cors({
    exposedHeaders: ['privilege'],
  })
)

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  )
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  next()
})

app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({ extended: true }))

const upload = multer({ dest: 'uploads/' })

export { upload as multer }

import { dashboard } from './routes/dashboard'

app.use('/dashboard', dashboard)

app.get('/', (req: Request, res: Response) => {
  res.send('Heihei website api backend!')
})

// app.listen(PORT, () => {
//   console.log(`Server started on port ${PORT}`)
// })

//start ssl server
const httpsServer = https.createServer(credentials, app)
httpsServer.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
