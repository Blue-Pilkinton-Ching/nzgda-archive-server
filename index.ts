import { config } from 'dotenv'

config()

import './src/server'
import './src/firebase'
import './src/aws'

console.log('Initialized NZGDA Archive Server!')
