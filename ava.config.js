const ext = process.env.SMOKE_TEST === 'true' ? 'test' : 'spec'
export default () => ({
  files: [`**/*.${ext}.js`, '!dist/**/*', '!package/**/*'],
  require: ['esm']
})
