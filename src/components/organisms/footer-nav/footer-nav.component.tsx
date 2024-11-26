import Link from 'next/link'
import React from 'react'

export default function FooterNav() {
    return (
        <footer className="flex items-center h-14 border-t px-4 gap-4 lg:h-20 border-gray-400 mt-auto">
            <nav className="flex items-center gap-4 text-sm lg:gap-8">
                <Link href="#" className="font-medium" prefetch={false}>
                    About
                </Link>
                <Link href="#" className="font-medium" prefetch={false}>
                    Contact
                </Link>
                <Link href="#" className="font-medium" prefetch={false}>
                    FAQ
                </Link>
            </nav>
            <p className="ml-auto text-xs text-gray-400">
                &copy; {new Date().getFullYear()} Shopay. All rights reserved.
            </p>
        </footer>
    )
}
