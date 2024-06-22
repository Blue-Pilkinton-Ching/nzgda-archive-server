import { Router } from 'express'
import privilege from '../authenticate'

export const admins = Router()
admins.use(privilege)
