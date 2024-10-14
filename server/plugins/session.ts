export default defineNitroPlugin(() => {
  sessionHooks.hook('fetch', (_session) => {
    // console.log('fetch', _session)
  })
})
