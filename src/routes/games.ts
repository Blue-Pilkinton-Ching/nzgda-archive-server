import { Router } from 'express'
import privilege from '../authenticate'
import { connection } from '../aws'

export const games = Router()
games.use(privilege)

games.get('/all/public', (req, res) => {
  connection.query(`SELECT * FROM games`, (err, results) => {
    if (err) {
      console.error(err)
      return
    }
    res.json(results)
  })
})
