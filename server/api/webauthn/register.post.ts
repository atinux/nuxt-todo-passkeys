import { z } from 'zod'

export default defineWebAuthnRegisterEventHandler({
  validateUser: user => z.object({
    userName: z.string().min(3),
    displayName: z.string().min(3).describe('name')
  }).parseAsync(user),
  async onSuccess(event, { user, credential }) {
    const db = useDB()

    const dbUser = await db.insert(tables.users).values({
      username: user.userName,
      name: user.displayName,
      createdAt: new Date(),
      lastLoginAt: new Date()
    }).returning().get().catch(() => {
      throw createError({
        statusCode: 400,
        message: 'User already exists'
      })
    })

    await db.insert(tables.credentials).values({
      userId: dbUser.id,
      id: credential.id,
      publicKey: credential.publicKey,
      counter: credential.counter,
      backedUp: credential.backedUp,
      transports: credential.transports
    })

    await setUserSession(event, {
      user: {
        id: dbUser.id,
        username: dbUser.username,
        name: dbUser.name || dbUser.username
      }
    })
  }
})
