import { Request, Response } from 'express'
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier'
import * as admin from 'firebase-admin'
import { connection } from './aws'

export default async function privilege(
  req: Request,
  res: Response,
  next: () => void
) {
  if (req.headers.authorization == undefined) {
    req.headers['privilege'] = 'noprivilege'
    next()
    return
  } else {
    let credential: DecodedIdToken

    try {
      credential = await admin
        .auth()
        .verifyIdToken(req.headers.authorization.split('Bearer ')[1])
    } catch (error) {
      res.status(401).send('Invalid token')
      return
    }

    connection.query(
      'SELECT * FROM admins WHERE uid = ?',
      [credential.uid],
      (error, results) => {
        if (error) {
          console.error(error)
          return res.status(500).send('Internal server error')
        }
        if (results.length > 0) {
          req.headers['privilege'] = 'admin'
          req.headers['studio'] = results[0].studio
          res.setHeader('studio', results[0].studio)
          res.setHeader('privilege', 'admin')
          next()
        } else {
          req.headers['privilege'] = 'noprivilege'
          next()
        }
      }
    )
  }
}
