import { Router } from 'express'
import privilege from '../authenticate'
import { Game, UserPrivilege } from '../../types'
import { connection } from '../aws'
import { multer } from '../server'
import { uploadFile } from '../util/s3'

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

game.post(
  '/',
  multer.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'banner', maxCount: 1 },
  ]),
  async (req, res) => {
    const privilege = req.headers['privilege'] as UserPrivilege
    const studio = req.headers['studio'] as string

    if (privilege == 'admin') {
      const data = JSON.parse(req.body.data)

      const files = req.files as {
        thumbnail: Express.Multer.File[]
        banner: Express.Multer.File[] | undefined
      }

      if (files.thumbnail == undefined) {
        res.status(400).json({ error: 'No thumbnail provided' })
        return
      }

      const game: any = {
        name: data.name,
        description: data.description,
        studio_id: Number(studio),
        thumbnail: null,
        approved: false,
        banner: null,
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

      let id

      connection.query(`INSERT INTO games SET ?`, game, (err, result) => {
        if (err) {
          console.error(err)
          res.status(500).send('Internal Server error')

          return
        }

        id = result.insertId
        res.send('Game added')
      })

      try {
        await Promise.all([
          (async () => {
            await uploadFile(
              `${process.env.AWS_BUCKET}`,
              `${id}/thumbnail.png`,
              files.thumbnail[0].path
            )
          })(),

          (async () => {
            if (files.banner) {
              await uploadFile(
                `${process.env.AWS_BUCKET}`,
                `${id}/banner.png`,
                files.banner[0].path
              )
            }
          })(),
        ])
      } catch (error) {
        console.error(error)
        res.status(500).send('Internal Server error')
        return
      }
    } else {
      res.status(401).send('Unauthorized')
    }
  }
)

game.patch(
  '/:gameID',
  multer.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'banner', maxCount: 1 },
  ]),
  async (req, res) => {
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
  }
)

game.delete('/:gameID', async (req, res) => {
  const privilege = req.headers['privilege'] as UserPrivilege
  if (privilege === 'admin') {
    connection.query(
      'DELETE FROM games WHERE id = ?',
      [req.params.gameID],
      (err) => {
        if (err) {
          console.error(err)
          res.status(500).send('Internal Server error')
          return
        }
        res.send('Game deleted')
      }
    )
  } else {
    res.status(401).send('Unauthorized')
  }
})
