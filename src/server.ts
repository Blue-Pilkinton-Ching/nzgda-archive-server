import express, { Request, Response } from 'express'
import cors from 'cors'
import https from 'https'
import fs from 'fs'

import multer from 'multer'

const app = express()
const PORT = process.env.PORT || 3002

let credentials = null

try {
  // SSL certs files
  const privateKey = fs.readFileSync(
    '/home/ubuntu/websites/ssl/server.key',
    'utf8'
  )
  const certificate = fs.readFileSync(
    '/home/ubuntu/websites/ssl/server.crt',
    'utf8'
  )
  credentials = { key: privateKey, cert: certificate }
} catch (error) {
  console.error('Error loading SSL certs')
}

app.use(
  cors({
    exposedHeaders: ['privilege', 'studio'],
    origin: '*',
  })
)

app.use(express.json({ limit: '10mb' }))
app.use(express.text({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 10 * 1024 * 1024 },
})

export { upload as multer }

import { admins } from './routes/admins'
import { games } from './routes/games'
import { game } from './routes/game'
import { requests } from './routes/requests'
import { studios } from './routes/studios'
import { dashboard } from './routes/dashboard'
app.use('/admins', admins)
app.use('/games', games)
app.use('/game', game)
app.use('/requests', requests)
app.use('/studios', studios)
app.use('/dashboard', dashboard)

app.get('/', (req: Request, res: Response) => {
  res.send('NZGDA website backend!')
})

if (credentials == null) {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
  })
} else {
  const httpsServer = https.createServer(credentials, app)
  httpsServer.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
  })
}
