import { Router } from 'express'
import privilege from '../authenticate'
import { Game, UserPrivilege } from '../../types'
import { connection } from '../aws'

export const game = Router()
game.use(privilege)

game.post('/', async (req, res) => {
  const privilege = req.headers['privilege'] as UserPrivilege

  if (privilege == 'admin') {
    let game: Game

    game = JSON.parse(req.body)

    connection.query(`INSERT INTO games SET ?`, game, (err) => {
      if (err) {
        console.error(err)
        return
      }
      res.send('Game added')
    })
  } else {
    res.status(401).send('Unauthorized')
  }
})
