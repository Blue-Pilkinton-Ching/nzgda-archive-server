import { Router } from 'express'
import privilege from '../authenticate'
import { connection } from '../aws'

export const studios = Router()
studios.use(privilege)

studios.get('/', (req, res) => {
  connection.query('SELECT * FROM studios', (error, results) => {
    if (error) {
      console.error(error)
      return res.status(500).send('Internal server error')
    }
    res.send(results)
  })
})
