import {
  isNilOrEmpty,
  omitBy,
  test,
  length
} from '@meltwater/phi'

export const DEFAULT_BATCH_SIZE = 1000
export const defaultGetprefixes = () => ''
export const defaultPerformFilterCheck = test(/.*/igm)
export const defaultShouldTruncate = (currentList, tripCount) => {
  if (tripCount > 50) return true
  if (length(currentList) >= DEFAULT_BATCH_SIZE) return true
  return false
}
export default ({
  storage,
  performFilterCheck = defaultPerformFilterCheck,
}) => async ({
  bucket,
  prefix,
  delimiter
}) => {
  const list = []
  console.time('duration:all')
  let continuationToken  = null
  do {
    console.log(' - - - ')
    const input = omitBy(isNilOrEmpty, {
      bucket,
      prefix,
      maxkeys: DEFAULT_BATCH_SIZE,
      delimiter,
      continuationToken
    })

    const { Contents: contents = [], NextContinuationToken: nextToken } = await storage.list(input)
    // nextToken = null
    continuationToken = nextToken
    for (const index in contents) {
      const item = contents[index]
      const { Key: key } = item
      const hasPassed = performFilterCheck(key)
      if (hasPassed) {
        list.push(item)
      }
    }
  } while (continuationToken) // use break to get out of loop
  console.timeEnd('duration:all')
  return {
    list,
    length: length(list),
    bucket,
    prefix
  }
}
