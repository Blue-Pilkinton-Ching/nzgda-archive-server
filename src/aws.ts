import { S3 } from '@aws-sdk/client-s3'
import mysql, { type QueryError } from 'mysql2'

const region = 'ap-southeast-2'

// EVERYTHING IS ON DIGITAL OCEAN NOW.
// Digital ocean is compatible with s3 apis.

const s3 = new S3({
  forcePathStyle: false,
  endpoint: process.env.AWS_ENDPOINT,
  region,
  credentials: {
    accessKeyId: process.env.AWS_KEY || '',
    secretAccessKey: process.env.AWS_KEY_SECRET || '',
  },
})

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: 25060,
  multipleStatements: true,
})

export { s3, connection }
