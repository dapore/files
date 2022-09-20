// Apparently the stream parameter should be of type Readable|ReadableStream|Blob
// The latter 2 don't seem to exist anywhere.
export default async stream => new Promise((resolve, reject) => {
  const chunks = []
  stream.on('data', chunk => chunks.push(chunk))
  stream.on('error', reject)
  stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')))
})
