'use client'
import { Card, Image, LoadingOverlay, Text } from '@/components/atoms'
import { Badge, Group } from '@mantine/core'
import React from 'react'
import { formatCurrency } from '@/utils'
import { FaCartPlus, FaStar } from 'react-icons/fa6'
import useSWR from 'swr'
import { useFetchApi } from '@/providers/fetch-api-provider'
import { ProductProps } from '@/components/templates/products/products.type'
import { useQueryParams } from '@/components/hooks/useQueryParams'
import Link from 'next/link'

export function ProductsList() {
    const client = useFetchApi()
    const { queryParams } = useQueryParams()
    const { data, isLoading } = useSWR(
        ['/products', queryParams.get('category')],
        async ([api, category]) => {
            console.log(category)
            const data = await client.getData<Array<ProductProps>>(
                api + (category ? `/category/${category}` : '')
            )

            return data?.data
        }
    )
    return (
        <div className="container mx-auto grid md:grid-cols-3 lg:grid-cols-4 gap-y-6 gap-x-7 md:col-span-3 relative">
            <LoadingOverlay visible={isLoading} />
            {data?.map((item) => (
                <Link href={`/products/${item.id}`}>
                    <Card
                        shadow="xs"
                        padding="md"
                        radius="sm"
                        withBorder
                        key={item.id}
                        className="group transition-all hover:-translate-y-0.5 hover:translate-x-0.5 hover:shadow-lg h-[327px]"
                    >
                        <Card.Section className="relative border-b border-b-gray-500" pb={'xs'}>
                            <Image
                                src={item.image}
                                h={200}
                                fit="contain"
                                fallbackSrc="https://placehold.co/600x400?text=Placeholder"
                            />
                            <div className="opacity-0 group-hover:opacity-100 transition-all">
                                <Badge
                                    color="indigo"
                                    size="xs"
                                    radius={'sm'}
                                    className="absolute right-2 top-2 "
                                >
                                    {item.category}
                                </Badge>
                            </div>
                        </Card.Section>

                        <div className="flex flex-col mt-4 mb-2">
                            <Text fw={500} fz="sm" lineClamp={2}>
                                {item.title}
                            </Text>
                            <Text fw={900} color="orange" fz="xs">
                                {formatCurrency(item.price, 'en-US', 'USD')}
                            </Text>
                        </div>

                        <Group justify="space-between" className="mt-auto">
                            <div className="flex gap-x-0.5">
                                <FaStar size={15} color="#FFBD1B" />
                                <Text className="!leading-normal">
                                    {item.rating.rate} | {item.rating.count} user
                                </Text>
                            </div>
                            <FaCartPlus
                                size={16}
                                className="cursor-pointer"
                                onClick={(e) => {
                                    e.preventDefault()
                                }}
                            />
                        </Group>
                    </Card>
                </Link>
            ))}
        </div>
    )
}
