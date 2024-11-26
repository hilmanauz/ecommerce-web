import { JWT } from 'next-auth/jwt'
import { withAuth } from 'next-auth/middleware'

export default withAuth({
    callbacks: {
        authorized: ({
            token,
        }: {
            token: (JWT & { error?: 'RefreshAccessTokenError' }) | null
        }) => {
            return token !== null && token?.error !== 'RefreshAccessTokenError'
        },
    },
})

export const config = {
    matcher: ['/'],
}
