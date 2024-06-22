import { Router } from 'express'
import privilege from '../authenticate'

export const requests = Router()
requests.use(privilege)
