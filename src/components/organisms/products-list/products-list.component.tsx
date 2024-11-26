'use client'
import { LoadingOverlay } from '@/components/atoms'
import React from 'react'
import useSWR from 'swr'
import { useFetchApi } from '@/providers/fetch-api-provider'
import { ProductProps } from '@/components/templates/products/products.type'
import { useQueryParams } from '@/hooks/useQueryParams'
import { ProductCard } from '@/components/moleculs'

export function ProductsList() {
    const client = useFetchApi()
    const { queryParams } = useQueryParams()
    const { data, isLoading } = useSWR(
        ['/products', queryParams.get('category')],
        async ([api, category]) => {
            const data = await client.getData<Array<ProductProps>>(
                api + (category ? `/category/${category}` : '')
            )

            return data?.data
        }
    )

    return (
        <div className="container mx-auto grid md:grid-cols-3 gap-y-6 gap-x-7 md:col-span-3 relative">
            <LoadingOverlay visible={isLoading} />
            {data?.map((item) => (
                <ProductCard item={item} />
            ))}
        </div>
    )
}
