'use client'
import { Button, Heading, Text } from '@/components/atoms'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import { FaSignOutAlt } from 'react-icons/fa'
import { FaUser } from 'react-icons/fa6'
import { FcShop } from 'react-icons/fc'

export function HeaderNav() {
    const { data: userData } = useSession()
    return (
        <header className="flex items-center h-14 px-4 border-b lg:h-20 gap-4 border-gray-400">
            <Link href={'/'}>
                <div className="flex items-end gap-2">
                    <FcShop size={30} />
                    <Heading order={4}>Shopay</Heading>
                </div>
            </Link>
            <nav className="ml-auto text-sm flex items-center gap-x-4">
                <Button leftSection={<FaUser />} variant="outline" size="compact-sm">
                    {userData?.user.username}
                </Button>
                <FaSignOutAlt
                    cursor={'pointer'}
                    onClick={() => {
                        signOut({
                            callbackUrl: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/login`,
                        })
                    }}
                />
            </nav>
        </header>
    )
}
