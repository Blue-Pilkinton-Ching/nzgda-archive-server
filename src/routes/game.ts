import { Router } from 'express'
import privilege from '../authenticate'

export const game = Router()
game.use(privilege)
