import { Router } from 'express'
import privilege from '../authenticate'

export const games = Router()
games.use(privilege)
