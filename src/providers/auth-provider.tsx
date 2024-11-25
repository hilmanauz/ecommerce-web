import { SessionProvider } from 'next-auth/react'

function AuthProvider({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider basePath={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/api/auth`}>
            {children}
        </SessionProvider>
    )
}

export default AuthProvider
