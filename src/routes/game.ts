import { Router } from 'express'
import privilege from '../authenticate'
import { Game, UserPrivilege } from '../../types'
import { connection } from '../aws'

export const game = Router()
game.use(privilege)

game.get('/:gameID', async (req, res) => {
  connection.query(
    `SELECT * FROM games WHERE id = ? LIMIT 1`,
    [Number(req.params.gameID)],
    (err, results) => {
      if (err) {
        console.error(err)
        res.status(500).send('Internal Server Error')
        return
      }
      res.send(results.length > 0 ? results[0] : {})
    }
  )
})

game.post('/', async (req, res) => {
  const privilege = req.headers['privilege'] as UserPrivilege
  const studio = req.headers['studio'] as string

  if (privilege == 'admin') {
    const data = req.body

    const game: any = {
      name: data.name,
      description: data.description,
      studio_id: Number(studio),
      thumbnail: `https://placehold.co/300x400/png`,
      approved: false,
      banner: `https://placehold.co/300x400/png`,
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
