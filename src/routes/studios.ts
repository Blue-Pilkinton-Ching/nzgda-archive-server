import { Router } from 'express'
import privilege from '../authenticate'
import { connection } from '../aws'
import { UserPrivilege } from '../../types'
import type { QueryError, RowDataPacket } from 'mysql2'

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

studios.get('/:id', (req, res) => {
  connection.query(
    'SELECT * FROM studios WHERE id = ? LIMIT 1',
    [req.params.id],
    (err: QueryError | null, results: RowDataPacket[]) => {
      if (results && results.length > 0) {
        res.send(results[0])
      } else {
        console.error(err)
        return res.status(500).send('Internal server error')
      }
    }
  )
})

studios.post('/', (req, res) => {
  const privilege = req.headers['privilege'] as UserPrivilege
  const studio = req.headers['studio'] as string

  const data = req.body.studio

  if (privilege === 'admin' && Number(studio) === 0) {
    connection.query(`INSERT INTO studios SET ?`, data, (err) => {
      if (err) {
        console.error(err)
        return res.status(500).send('Internal server error')
      }
      res.status(200).send('Success')
    })
  } else {
    res.status(401).send('Unauthorized')
  }
})

studios.patch('/', (req, res) => {
  const privilege = req.headers['privilege'] as UserPrivilege
  const studio = req.headers['studio'] as string

  if (privilege === 'admin' && Number(studio) === 0) {
    connection.query(
      'UPDATE studios SET ? WHERE id = ?',
      [req.body, req.body.id],
      (err) => {
        if (err) {
          console.error(err)
          return res.status(500).send('Internal server error')
        }
        res.status(200).send('Success')
      }
    )
  } else {
    res.status(401).send('Unauthorized')
  }
})

studios.delete('/', (req, res) => {
  const privilege = req.headers['privilege'] as UserPrivilege
  const studio = req.headers['studio'] as string

  if (privilege === 'admin' && Number(studio) === 0) {
    connection.query(
      'DELETE FROM studios WHERE id = ?',
      [req.body.id],
      (err) => {
        if (err) {
          console.error(err)
          return res.status(500).send('Internal server error')
        }
        res.status(200).send('Success')
      }
    )
  } else {
    res.status(401).send('Unauthorized')
  }
})
