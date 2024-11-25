import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const loginFetch = (payload: { username: string; password: string }) =>
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'https://fakestoreapi.com'}/auth/login`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json',
        },
    })

export const nextAuthSession: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: {
                    label: 'username',
                    type: 'text',
                    placeholder: 'johnd',
                },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials) return
                const payload = {
                    username: credentials.username,
                    password: credentials.password,
                }
                console.log(payload)
                const res = await loginFetch(payload)
                const data = await res.json()
                if (!res.ok) {
                    throw new Error(data.message)
                }
                if (res.ok && data) {
                    return {
                        ...data,
                        username: payload.username,
                        id: 'test-1',
                    }
                }
                return null
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, account }: any) {
            if (account && user) {
                return {
                    ...token,
                    ...user.user,
                    token: user.token,
                }
            }

            return token
        },

        session({ session, token }: any) {
            session.token = token.token
            session.user.username = token.username
            return session
        },
    },
    pages: {
        signIn: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/login`,
    },
    session: {
        strategy: 'jwt',
    },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development',
}
