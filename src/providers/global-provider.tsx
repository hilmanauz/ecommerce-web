'use client'
import React from 'react'
import AuthProvider from './auth-provider'
import { Notifications } from '@mantine/notifications'
import { SWRConfig } from 'swr'
import { MantineProvider } from '@mantine/core'

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
            <MantineProvider>
                <SWRConfig
                    value={{
                        shouldRetryOnError: false,
                    }}
                >
                    {children}
                    <Notifications />
                </SWRConfig>
            </MantineProvider>
        </AuthProvider>
    )
}

export default GlobalProvider