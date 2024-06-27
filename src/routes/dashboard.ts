import { Router } from 'express'
import privilege from '../authenticate'
import { UserPrivilege } from '../../types'
import { connection } from '../aws'

export const dashboard = Router()
dashboard.use(privilege)

dashboard.get(`/`, async (req, res) => {
  const privilege = req.headers['privilege'] as UserPrivilege
  const studio = req.headers['studio'] as string
  if (privilege == 'admin') {
    let query = ''

    if (studio === '0') {
      query = `SELECT * FROM games;
      SELECT * FROM admins;
      SELECT * FROM requests;
      SELECT * FROM studios;`
    } else {
      query = `SELECT * FROM games;
      SELECT * FROM admins;
      SELECT * FROM requests;
      SELECT * FROM studios;`
    }

    connection.query(
      query,
      // [req.params.uid],
      (err, results) => {
        if (err) {
          console.error(err)
          res.status(500).send('Internal Server error')

          return
        }
        const dashboardData = {
          games: results[0],
          admins: results[1],
          requests: results[2],
          studios: results[3],
        }

        res.json(dashboardData)
      }
    )
  } else {
    res.status(401).send('Unauthorized')
  }
})
