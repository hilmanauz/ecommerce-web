import { Heading } from '@/components/atoms'
import Link from 'next/link'
import React from 'react'
import { FcShop } from 'react-icons/fc'

export function HeaderNav() {
    return (
        <header className="flex items-center h-14 px-4 border-b lg:h-20 gap-4 border-gray-400">
            <Link href={'/'}>
                <div className="flex items-end gap-2">
                    <FcShop size={30} />
                    <Heading order={4}>Shopay</Heading>
                </div>
            </Link>
            <nav className="ml-auto hidden gap-4 text-sm lg:flex">
                <Link href="#" className="font-medium" prefetch={false}>
                    Home
                </Link>
                <Link href="#" className="font-medium" prefetch={false}>
                    Products
                </Link>
            </nav>
        </header>
    )
}
