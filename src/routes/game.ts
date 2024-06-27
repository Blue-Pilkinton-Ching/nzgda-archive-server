import { Router } from 'express'
import privilege from '../authenticate'
import { Game, UserPrivilege } from '../../types'
import { connection } from '../aws'

export const game = Router()
game.use(privilege)

game.post('/', async (req, res) => {
  const privilege = req.headers['privilege'] as UserPrivilege
  const studio = req.headers['studio'] as UserPrivilege

  if (privilege == 'admin') {
    const data = req.body

    const game: any = {
      name: data.name,
      description: data.description,
      studio_id: Number(studio),
      thumbnail: 'test',
      approved: false,
      banner: '',
      educational: false,
      featured: false,
      height: null,
      width: null,
      hidden: false,
      isApp: false,
      sort: null as any as number,
      tags: '',
      url: data.url || null,
    }

    connection.query(`INSERT INTO games SET ?`, game, (err) => {
      if (err) {
        console.error(err)
        res.status(500).send('Internal Server error')

        return
      }
      res.send('Game added')
    })
  } else {
    res.status(401).send('Unauthorized')
  }
})

game.patch('/:gameID', async (req, res) => {
  const privilege = req.headers['privilege'] as UserPrivilege
  const gameID = req.params.gameID

  if (privilege === 'admin') {
    const data = req.body

    if (!gameID) {
      res.status(400).send('Missing game ID')
      return
    }

    connection.query(
      'UPDATE games SET ? WHERE id = ?',
      [data, gameID],
      (err) => {
        if (err) {
          console.error(err)
          res.status(500).send('Internal Server error')
          return
        }
        res.send('Game updated')
      }
    )
  } else {
    res.status(401).send('Unauthorized')
  }
})
