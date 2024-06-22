import { S3 } from '@aws-sdk/client-s3'
import mysql from 'mysql'

const region = 'ap-southeast-2'

const s3 = new S3({
  region,
  credentials: {
    accessKeyId: process.env.AWS_KEY || '',
    secretAccessKey: process.env.AWS_KEY_SECRET || '',
  },
})

const connectionConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: 3306,
}

const connection = mysql.createConnection(connectionConfig)

// connect.
connection.connect((err: { stack: string }) => {
  if (err) {
    console.error('Error connecting to MySQL RDS: ' + err.stack)
    return
  }
  console.log('Connected to MySQL RDS as ID ' + connection.threadId)
})

export { s3, connection }
