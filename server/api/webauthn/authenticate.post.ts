export default defineWebAuthnAuthenticateEventHandler({
  async storeChallenge(event, challenge, attemptId) {
    await hubKV().set(`challenge:${attemptId}`, challenge, { ttl: 60 })
  },
  async getChallenge(event, attemptId) {
    const challenge = await hubKV().get<string>(`challenge:${attemptId}`)
    if (!challenge) {
      throw createError({
        statusCode: 400,
        message: 'Challenge not found or expired'
      })
    }
    return challenge
  },
  async allowCredentials(event, userName) {
    const db = useDB()

    const user = await db.query.users.findFirst({
      where: eq(tables.users.username, userName),
      with: {
        credentials: true
      }
    })

    return user?.credentials || []
  },
  async getCredential(event, credentialID) {
    const credential = await useDB().query.credentials.findFirst({
      where: eq(tables.credentials.id, credentialID),
      with: {
        user: true
      }
    })

    if (!credential) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Credential not found'
      })
    }

    return credential
  },
  async onSuccess(event, { credential }) {
    await setUserSession(event, {
      user: {
        id: credential.user.id,
        name: credential.user.name,
        username: credential.user.username
      }
    })
  }
})
