import { Card, Image, Text } from '@/components/atoms'
import { formatCurrency } from '@/utils'
import { Badge, Group } from '@mantine/core'
import Link from 'next/link'
import React from 'react'
import { BsArrowLeftSquare, BsArrowRightSquare } from 'react-icons/bs'
import { FaCartPlus, FaStar } from 'react-icons/fa6'
import { ProductCardProps } from './product-card.types'
import { useCartContext } from '@/providers/cart-provider'
import { useDebouncedCallback } from '@mantine/hooks'

export function ProductCard({ item }: ProductCardProps) {
    const { carts, updateQuantity, addToCart } = useCartContext()
    const productCart = React.useMemo(
        () => carts?.products.find((cart) => cart.productId === item.id),
        [carts]
    )
    const [quantity, setQuantity] = React.useState<number>()
    React.useEffect(() => {
        setQuantity(productCart?.quantity || 0)
    }, [productCart?.quantity])

    const handleQuantity = useDebouncedCallback((quantity: number) => {
        updateQuantity(item.id, quantity)
    }, 1000)

    return (
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
                    <div className="flex gap-x-1 items-center">
                        {productCart && quantity ? (
                            <>
                                <BsArrowLeftSquare
                                    size={13}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        const newQuantity = quantity - 1
                                        setQuantity(newQuantity)
                                        handleQuantity(newQuantity)
                                    }}
                                />
                                <Text>{quantity}</Text>
                                <BsArrowRightSquare
                                    size={13}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        const newQuantity = quantity + 1
                                        setQuantity(newQuantity)
                                        handleQuantity(newQuantity)
                                    }}
                                />
                            </>
                        ) : (
                            <FaCartPlus
                                size={16}
                                className="cursor-pointer"
                                onClick={(e) => {
                                    e.preventDefault()
                                    addToCart(item.id, item)
                                    setQuantity(1)
                                }}
                            />
                        )}
                    </div>
                </Group>
            </Card>
        </Link>
    )
}
