import { FilterBar, ProductsList } from '@/components/organisms'
import { Products } from '@/components/templates'
import CartProvider from '@/providers/cart-provider'
import React from 'react'

export default async function ListProductsPage() {
    const responseCategories = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/categories`,
        {
            method: 'GET',
        }
    )
    const dataCategories = await responseCategories.json()
    return (
        <Products
            ListProductPage={<ProductsList />}
            FilterBar={<FilterBar categories={['all', ...dataCategories]} />}
        />
    )
}
