'use client'
import { Card, Heading, Text } from '@/components/atoms'
import { useQueryParams } from '@/components/hooks/useQueryParams'
import { ProductProps } from '@/components/templates/products/products.type'
import { useFetchApi } from '@/providers/fetch-api-provider'
import { formatCurrency } from '@/utils'
import { NavLink } from '@mantine/core'
import { capitalize } from 'lodash'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import { BsCartCheckFill } from 'react-icons/bs'
import { FaCheck } from 'react-icons/fa6'
import useSWR from 'swr'

export function FilterBar({ categories }: { categories: Array<string> }) {
    const { data: userData } = useSession()
    const client = useFetchApi()
    const { queryParams } = useQueryParams()
    const category = queryParams.get('category') || 'all'

    const { data } = useSWR(['/carts/1'], async ([api]) => {
        const data = await client.getData<{
            date: string
            id: number
            products: Array<{ productId: number; quantity: number; product?: ProductProps }>
        }>(api)
        const fetchProductsCart = data?.data.products.map(async (item) => {
            const product = await client.getData(`/products/${item.productId}`)
            if (!product) return item
            return { ...item, product: product.data }
        })
        const products = await Promise.allSettled(fetchProductsCart || [])
        return products
    })

    return (
        <div className="gap-4 md:col-span-1 space-y-5">
            <Card className="h-min">
                <Heading order={3} className="!mb-2">
                    Categories
                </Heading>
                {categories.map((item, index) => (
                    <NavLink
                        href={item === 'all' ? '/' : `/?category=${item}`}
                        component={Link}
                        key={`${item}-${index}`}
                        fw={item === category ? 700 : 500}
                        active={item === category}
                        label={capitalize(item)}
                        rightSection={category === item ? <FaCheck /> : undefined}
                        // onClick={() =>
                        //     item === 'all'
                        //         ? removeQueryParams(['category'])
                        //         : setQueryParams({
                        //               category: item,
                        //           })
                        // }
                    />
                ))}
            </Card>
            <Card className="h-min">
                <div className="flex justify-between gap-x-1 mb-2">
                    <Heading order={3}>Carts </Heading>
                    <div className="flex gap-x-1 items-center max-w-[50%]">
                        <BsCartCheckFill size={20} />
                        <Text
                            fz={'lg'}
                            span
                            td={'underline'}
                            className="underline-offset-8"
                            truncate
                        >
                            {userData?.user.username}
                        </Text>
                    </div>
                </div>
                <ul className="grid gap-2 text-sm mt-2 max-h-[400px] overflow-y-auto">
                    {data?.map((item) =>
                        item.status === 'fulfilled' ? (
                            <li>
                                <Link
                                    href="#"
                                    className="font-medium flex gap-x-2 justify-between"
                                    prefetch={false}
                                >
                                    <Text lineClamp={1} className="w-[80%] hover:underline">
                                        {item.value.product?.title}
                                    </Text>
                                    <Text lineClamp={1} className="w-[28%] text-end">
                                        {formatCurrency(item.value.product?.price, 'en-US', 'USD')}
                                    </Text>
                                </Link>
                            </li>
                        ) : (
                            <></>
                        )
                    )}
                </ul>
            </Card>
        </div>
    )
}
