import { Router } from 'express'
import privilege from '../authenticate'
import { connection } from '../aws'

export const games = Router()
games.use(privilege)

games.get('/all/public', (req, res) => {
  connection.query(`SELECT * FROM games`, (err, results) => {
    if (err) {
      console.error(err)
      res.status(500).send('Internal Server error')

      return
    }
    res.json(results)
  })
})
