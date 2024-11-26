import React from 'react'
import { ProductsProps } from './products.type'
import { HeaderNav, ProductsList } from '@/components/organisms'
import FooterNav from '@/components/organisms/footer-nav/footer-nav.component'

export function Products({ FilterBar, ListProductPage }: ProductsProps) {
    return (
        <>
            <HeaderNav />
            <section className="flex-1 py-8">
                <div className="grid md:grid-cols-4 gap-8 px-4 md:gap-8 lg:px-6">
                    {FilterBar}
                    {ListProductPage}
                </div>
            </section>
            <FooterNav />
        </>
    )
}
