import Link from "next/link";
import { FcShop } from "react-icons/fc";

export default function Component() {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="flex items-center h-14 px-4 border-b lg:h-20 gap-4 dark:border-gray-800">
                <div className="flex items-center gap-2">
                    <FcShop size={30} />
                    <span className="font-semibold">Mantine Shop</span>
                </div>
                <nav className="ml-auto hidden gap-4 text-sm lg:flex">
                    <Link href="#" className="font-medium" prefetch={false}>
                        Home
                    </Link>
                    <Link href="#" className="font-medium" prefetch={false}>
                        Products
                    </Link>
                </nav>
            </header>
            <main className="flex-1 py-8">
                <div className="grid md:grid-cols-4 gap-8 px-4 md:gap-8 lg:px-6">
                    <div className="grid gap-4 md:col-span-1"></div>
                    <div className="grid md:grid-cols-2 gap-8 md:col-span-3"></div>
                </div>
            </main>
            <footer className="flex items-center h-14 border-t px-4 gap-4 lg:h-20 dark:border-gray-800">
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
                <p className="ml-auto text-xs text-gray-500 dark:text-gray-400">
                    &copy; {new Date().getFullYear()} Mantine Shop. All rights
                    reserved.
                </p>
            </footer>
        </div>
    );
}
