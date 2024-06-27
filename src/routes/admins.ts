import { Router } from 'express'
import privilege from '../authenticate'
import { UserPrivilege } from '../../types'
import { connection } from '../aws'

export const admins = Router()
admins.use(privilege)

admins.get(`/:uid`, async (req, res) => {
  const privilege = req.headers['privilege'] as UserPrivilege
  if (privilege == 'admin') {
    connection.query(
      `SELECT * FROM admins WHERE uid = ?`,
      [req.params.uid],
      (err, results) => {
        if (err) {
          console.error(err)
          res.status(500).send('Internal Server error')

          return
        }
        res.json(results)
      }
    )
  } else {
    res.status(401).send('Unauthorized')
  }
})

admins.get('/', async (req, res) => {
  const privilege = req.headers['privilege'] as UserPrivilege
  if (privilege == 'admin') {
    connection.query(`SELECT * FROM admins`, (err, results) => {
      if (err) {
        console.error(err)
        res.status(500).send('Internal Server error')

        return
      }
      res.json(results)
    })
  } else {
    res.status(401).send('Unauthorized')
  }
})
