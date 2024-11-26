'use client'
import { Card, Heading, LoadingOverlay, Text } from '@/components/atoms'
import { useQueryParams } from '@/hooks/useQueryParams'
import { classNames, formatCurrency } from '@/utils'
import { NavLink } from '@mantine/core'
import { capitalize } from 'lodash'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import { BsCartCheckFill } from 'react-icons/bs'
import { FaCheck } from 'react-icons/fa6'
import { useCartContext } from '@/providers/cart-provider'

export function FilterBar({ categories }: { categories: Array<string> }) {
    const { data: userData } = useSession()
    const { isLoading, carts } = useCartContext()
    const { queryParams } = useQueryParams()
    const category = queryParams.get('category') || 'all'

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
                    />
                ))}
            </Card>
            <Card className="h-min">
                <div className="flex justify-between gap-x-1 mb-2">
                    <Link href={'/cart'} className="hover:underline">
                        <Heading order={3}>Carts </Heading>
                    </Link>
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
                {carts?.products.length ? (
                    <ul
                        className={classNames(
                            'grid gap-2 text-sm mt-2 max-h-[400px] overflow-y-auto',
                            isLoading && 'h-28'
                        )}
                    >
                        <LoadingOverlay visible={isLoading} />
                        {carts?.products.map((item) => (
                            <li>
                                <Link
                                    href={`/products/${item.product?.id}`}
                                    className="font-medium flex gap-x-2 justify-between"
                                    prefetch={false}
                                >
                                    <Text lineClamp={1} className="w-[80%] hover:underline">
                                        {item.product?.title}
                                    </Text>
                                    <Text lineClamp={1} className="w-[28%] text-end">
                                        {formatCurrency(item.product?.price || 0, 'en-US', 'USD')}
                                    </Text>
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="h-28 flex justify-center items-center">
                        <Heading order={5}>Your cart is empty.</Heading>
                    </div>
                )}
            </Card>
        </div>
    )
}
