import { Router } from 'express'
import privilege from '../authenticate'
import { UserPrivilege } from '../../types'
import { connection } from '../aws'

export const requests = Router()
requests.use(privilege)

requests.post('/', (req, res) => {
  const privilege = req.headers['privilege'] as UserPrivilege

  if (privilege === 'noprivilege') {
    const { uid, email } = req.body

    connection.query(
      'SELECT uid FROM requests WHERE uid = ?',
      [uid],
      (err, results) => {
        if (err) {
          console.error(err)
          return res.status(500).send('Internal server error')
        }

        if (results.length === 0) {
          const insertQuery = 'INSERT INTO requests (uid, email) VALUES (?, ?)'
          connection.query(insertQuery, [uid, email], (insertErr) => {
            if (insertErr) {
              console.error(insertErr)
              return res.status(500).send('Internal server error')
            }
          })
        } else {
          res.status(422).send('Request already exists')
        }
      }
    )
  } else {
    res.status(401).send('Unauthorized')
  }

  res.send('Request added')
})

requests.patch('/', (req, res) => {
  const privilege = req.headers['privilege'] as UserPrivilege
  const studio = req.headers['studio'] as string

  if (privilege === 'admin' && Number(studio) === 0) {
    connection.query(
      'DELETE FROM requests WHERE uid = ?',
      req.body.uid,
      (err) => {
        if (err) {
          console.error(err)
          return res.status(500).send('Internal server error')
        }
        connection.query(
          'INSERT INTO admins (uid, email, studio) VALUES (?, ?, ?)',
          [req.body.uid, req.body.email, req.body.studio],
          (insertErr) => {
            if (insertErr) {
              console.error(insertErr)
              return res.status(500).send('Internal server error')
            }
            res.send('Request updated')
          }
        )
      }
    )
  } else {
    res.status(401).send('Unauthorized')
  }
})

requests.delete('/', (req, res) => {
  const privilege = req.headers['privilege'] as UserPrivilege
  const studio = req.headers['studio'] as string

  if (privilege === 'admin' && Number(studio) === 0) {
    connection.query(
      'DELETE FROM requests WHERE uid = ?',
      req.body.uid,
      (err) => {
        if (err) {
          console.error(err)
          return res.status(500).send('Internal server error')
        }
        res.send('Request deleted')
      }
    )
  } else {
    res.status(401).send('Unauthorized')
  }
})
