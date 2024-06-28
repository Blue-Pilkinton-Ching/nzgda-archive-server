import { Router } from 'express'
import privilege from '../authenticate'
import { Studio, UserPrivilege } from '../../types'
import { connection } from '../aws'

export const requests = Router()
requests.use(privilege)

requests.post('/', (req, res) => {
  const privilege = req.headers['privilege'] as UserPrivilege

  if (privilege === 'noprivilege') {
    const { uid, email } = req.body

    connection.query(
      'SELECT UID FROM requests WHERE UID = ?',
      [uid],
      (err, results) => {
        if (err) {
          console.error(err)
          return res.status(500).send('Internal server error')
        }

        if (results.length === 0) {
          const insertQuery = 'INSERT INTO requests (UID, email) VALUES (?, ?)'
          connection.query(insertQuery, [uid, email], (insertErr) => {
            if (insertErr) {
              console.error(insertErr)
              return res.status(500).send('Internal server error')
            }
          })
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
      'DELETE FROM requests WHERE UID = ?',
      req.body.UID,
      (err) => {
        if (err) {
          console.error(err)
          return res.status(500).send('Internal server error')
        }
        connection.query(
          'INSERT INTO admins (uid, email, studio) VALUES (?, ?, ?)',
          [req.body.UID, req.body.email, req.body.studio],
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
