import { Router } from 'express'
import privilege from '../authenticate'

export const studios = Router()
studios.use(privilege)
