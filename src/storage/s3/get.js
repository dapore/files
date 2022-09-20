import { GetObjectCommand } from '@aws-sdk/client-s3'
import { isNilOrEmpty, omitBy } from '@meltwater/phi'
import streamToString from '../../util/stream-to-string'

export default s3Client => async ({
  bucket,
  key
}) => {
  const input = omitBy(isNilOrEmpty, {
    Bucket: bucket,
    Key: key
  })
  const command = new GetObjectCommand(input)
  const { Body: stream } = await s3Client.send(command)
  if (isNilOrEmpty(stream)) return stream // null
  return streamToString(stream)
}
