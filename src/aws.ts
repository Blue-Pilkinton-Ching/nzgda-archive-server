import { S3 } from '@aws-sdk/client-s3'

const region = 'ap-southeast-2'

const s3 = new S3({
  region,
  credentials: {
    accessKeyId: process.env.AWS_KEY || '',
    secretAccessKey: process.env.AWS_KEY_SECRET || '',
  },
})

export default s3
