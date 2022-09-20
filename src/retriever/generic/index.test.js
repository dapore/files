// SMOKE_TEST="true" npx ava src/storage/s3/index.test.js
import { defaultTo, includes, length } from '@meltwater/phi'
import test from 'ava'
import { config } from 'dotenv'
import { createS3Storage } from '../../storage'
import createRetriever from './index'

config()
test.beforeEach(async t => {
  const region = defaultTo('us-east-1', process.env.AWS_REGION)
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

  const storage = createS3Storage({ region, accessKeyId, secretAccessKey })
  const retriever = createRetriever({
    storage,
    // performFilterCheck: includes('1d2e5065-828a-4de0-ae59-ab836897003d')
    shouldTruncate: () => false
  })
  t.context.retriever = retriever
  t.context.startDate = ''
  t.context.endDate = ''
  t.context.getVariablePrefix = (startDate, endDate) => {
    return '2022/09/19'
  }
})

test('Check list files on s3 using pattern retriever', async t => {
  t.plan(1)
  const { retriever, startDate, endDate, getVariablePrefix } = t.context
  const input = {
    bucket: 'autofill-service-data',
    // prefix: 'queue/model-enrichment-update/2022/',
    // prefix: `auto-detect/${getVariablePrefix(startDate, endDate)}`,
    // prefix: 'auto-detect/2022/09/19',
    prefix: 'auto-detect/2022',
    // startAfter: 'YmFja3VwL2pvdGZvcm0tc2FsZXMtZm9ybS1jcmVkaXQtZnVsbC8yMDIxLzAxLzE5LzE5LzM0LzE4LzZkZjVlNjlmLTU5NzktNGIxZS1hYTA0LTI5NTVlMDUyMDE2MC5qc29u'
  }
  console.log('the input is ', input)
  const response = await retriever(input)
  console.log('the response length', { length: length(response.list), token: response.nextToken })
  t.truthy(response)
})

// s3://autofill-service-data/auto-detect/2022/09/02/

// startdate 2022/09/02
// enddate 2022/09/20

// /2022/09

// /2022

// /

