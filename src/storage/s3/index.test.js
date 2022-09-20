// SMOKE_TEST="true" BEARER_TOKEN="" API_KEY="" npx ava src/storage/s3/index.test.js
import { defaultTo } from '@meltwater/phi'
import test from 'ava'
import { config } from 'dotenv'
import createS3Storage from './index'

config()
test.beforeEach(async t => {
  const region = defaultTo('us-east-1', process.env.AWS_REGION)
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

  const storage = createS3Storage({ region, accessKeyId, secretAccessKey })
  t.context.storage = storage
})

test('Check list files on s3', async t => {
  const { storage } = t.context
  const input = { bucket: 'form-service-data', prefix: '' }
  const response = await storage.list(input)
  t.truthy(response)
})

test('Check get file from s3', async t => {
  const { storage } = t.context
  const input = { bucket: 'form-service-data', key: 'auto-update/sales-credit-form/1608551851929000706.json' }
  const response = await storage.get(input)
  t.truthy(response)
})
