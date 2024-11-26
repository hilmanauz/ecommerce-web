'use client'
import { Button, Image, Text, TextInput } from '@/components/atoms'
import React from 'react'
import { ProductDetailProps } from './product-detail.types'
import { formatCurrency, handlePreventAlphabet } from '@/utils'
import { FaCartPlus, FaStar } from 'react-icons/fa6'
import { useDebouncedCallback } from '@mantine/hooks'
import { useCartContext } from '@/providers/cart-provider'
import { BsArrowLeftSquare, BsArrowRightSquare } from 'react-icons/bs'

export function ProductDetail({ data }: ProductDetailProps) {
    const { carts, updateQuantity, addToCart } = useCartContext()
    const productCart = React.useMemo(
        () => carts?.products.find((cart) => cart.productId === data.id),
        [carts]
    )
    const [quantity, setQuantity] = React.useState<number>()
    React.useEffect(() => {
        setQuantity(productCart?.quantity || 0)
    }, [productCart?.quantity])

    const handleQuantity = useDebouncedCallback((quantity: number) => {
        updateQuantity(data.id, quantity)
    }, 1000)

    const handleChangeQuantity = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        updateQuantity(data.id, quantity || 0)
    }, 1000)

    return (
        <div className="flex flex-col md:flex-row gap-8 flex-1">
            <div className="md:w-1/2 h-full p-10 flex justify-center">
                <Image src={data.image} className="max-w-sm" />
            </div>
            <div className="md:w-1/2 py-5 pr-8">
                <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
                <div className="flex justify-between mb-4">
                    <p className="text-2xl font-bold">
                        {formatCurrency(data.price, 'en-US', 'USD')}
                    </p>
                    <div className="flex gap-x-0.5 items-center">
                        <FaStar size={20} color="#FFBD1B" />
                        <p className="text-xl font-bold">
                            {data.rating.rate} | {data.rating.count} user
                        </p>
                    </div>
                </div>
                <p className="mb-6">{data.description}</p>
                <div className="flex gap-x-3 items-center">
                    {productCart && quantity ? (
                        <>
                            <BsArrowLeftSquare
                                size={30}
                                onClick={(e) => {
                                    e.preventDefault()
                                    const newQuantity = quantity - 1
                                    setQuantity(newQuantity)
                                    handleQuantity(newQuantity)
                                }}
                            />
                            <TextInput
                                value={quantity}
                                type="number"
                                onChange={(e) => {
                                    setQuantity(parseInt(e.target.value))
                                    handleChangeQuantity(e)
                                }}
                                onKeyDown={handlePreventAlphabet}
                            />
                            <BsArrowRightSquare
                                size={30}
                                onClick={(e) => {
                                    e.preventDefault()
                                    const newQuantity = quantity + 1
                                    setQuantity(newQuantity)
                                    handleQuantity(newQuantity)
                                }}
                            />
                        </>
                    ) : (
                        <Button
                            leftSection={<FaCartPlus size={16} />}
                            size="lg"
                            color="blue"
                            variant="filled"
                            fullWidth
                            onClick={(e) => {
                                addToCart(data.id, data)
                                setQuantity(1)
                            }}
                        >
                            Add to Cart
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}
