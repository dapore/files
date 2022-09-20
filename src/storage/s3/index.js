import { S3Client } from '@aws-sdk/client-s3'
import createList from './list'
import createGet from './get'

export default ({ region, accessKeyId, secretAccessKey }) => {
  const credentials = { accessKeyId, secretAccessKey }
  const s3Client = new S3Client({ region, credentials })
  return { list: createList(s3Client), get: createGet(s3Client) }
}
