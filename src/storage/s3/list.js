import { ListObjectsV2Command } from '@aws-sdk/client-s3'
import { isNilOrEmpty, omitBy } from '@meltwater/phi'

export default s3Client => async ({
  bucket,
  continuationToken,
  delimiter,
  maxkeys,
  prefix,
  startAfter,
  expectedBucketOwner,
  fetchOwner,
  requestPayer
}) => {
  const input = omitBy(isNilOrEmpty, {
    Bucket: bucket,
    ContinuationToken: continuationToken,
    Delimiter: delimiter,
    Maxkeys: maxkeys,
    Prefix: prefix,
    StartAfter: startAfter,
    ExpectedBucketOwner: expectedBucketOwner,
    FetchOwner: fetchOwner,
    RequestPayer: requestPayer
  })
  const command = new ListObjectsV2Command(input)
  return s3Client.send(command)
}
