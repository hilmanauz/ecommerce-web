// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { User } from 'next-auth'

declare module 'next-auth' {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
     */
    interface Session {
        user: User & {
            username?: string
        }
        error?: 'RefreshAccessTokenError'
    }
}
