'use client'
import React from 'react'
import AuthProvider from './auth-provider'
import { Notifications } from '@mantine/notifications'
import { SWRConfig } from 'swr'
import { MantineProvider } from '@mantine/core'
import CartProvider from './cart-provider'

function GlobalProvider({ children }: { children: React.ReactNode }) {
    const [hydrated, setHydrated] = React.useState(false)
    React.useEffect(() => {
        setHydrated(true)
    }, [])
    if (!hydrated) {
        return null
    }
    return (
        <AuthProvider>
            <MantineProvider
                theme={{
                    headings: {
                        fontFamily: 'Greycliff CF, sans-serif',
                    },
                    fontFamily: 'Geist, sans-serif',
                    fontSizes: {
                        base: '14px',
                        sm: '12px',
                    },
                }}
            >
                <SWRConfig
                    value={{
                        shouldRetryOnError: false,
                    }}
                >
                    <CartProvider>{children}</CartProvider>
                    <Notifications />
                </SWRConfig>
            </MantineProvider>
        </AuthProvider>
    )
}

export default GlobalProvider
