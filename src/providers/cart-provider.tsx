'use client'
import { CartProps } from '@/components/organisms/filter-bar/filter-bar.types'
import React from 'react'
import useSWR, { KeyedMutator } from 'swr'
import { useFetchApi } from './fetch-api-provider'
import { isEqual } from 'lodash'
import { ProductProps } from '@/components/templates/products/products.type'

const CartContext = React.createContext<{
    carts?: CartProps
    updateQuantity: (id: number, newQuantity: number) => Promise<void>
    removeItem: (id: number) => Promise<void>
    clearCart: (id: number) => Promise<void>
    isLoading: boolean
    addToCart: (id: number, product: ProductProps) => Promise<void>
}>({
    carts: undefined,
    removeItem: async () => {},
    clearCart: async () => {},
    updateQuantity: async () => {},
    addToCart: async () => {},
    isLoading: false,
})

export const useCartContext = () => React.useContext(CartContext)

const CartProvider = (props: React.PropsWithChildren<{}>) => {
    const [carts, setCarts] = React.useState<CartProps>()
    const client = useFetchApi()

    const { data, isLoading, mutate } = useSWR(
        ['/carts/1'],
        async ([api]) => {
            const data = await client.getData<CartProps>(api)
            const fetchProductsCart = data?.data.products.map(async (item) => {
                const product = await client.getData(`/products/${item.productId}`)
                if (!product) return item
                return { ...item, product: product.data }
            })
            const products = await Promise.allSettled(fetchProductsCart || [])
            return {
                date: data?.data.date || '',
                userId: data?.data.id || 0,
                products: products
                    .filter((item) => item.status === 'fulfilled')
                    .map((item) => ({ ...item.value })),
            }
        },
        {
            revalidateOnMount: false,
            revalidateOnFocus: false,
        }
    )

    React.useEffect(() => {
        !carts && mutate()
        // @ts-ignore
        !carts && setCarts(data)
    }, [data, carts])

    const updateQuantity = async (id: number, newQuantity: number) => {
        if (!carts) return
        const updatedCarts = {
            ...carts,
            products: carts.products.map((item) =>
                item.productId === id ? { ...item, quantity: Math.max(0, newQuantity) } : item
            ),
        }
        setCarts(updatedCarts)
        await client.updateCart({
            productId: id.toString(),
            payload: updatedCarts,
        })
    }

    const addToCart = async (id: number, product: ProductProps) => {
        if (!carts) return
        const updatedCarts = {
            ...carts,
            products: [...carts.products, { productId: id, quantity: 1, product }],
        }
        setCarts(updatedCarts)
        await client.updateCart({
            productId: id.toString(),
            payload: updatedCarts,
        })
    }

    const removeItem = async (id: number) => {
        if (!carts) return
        setCarts({
            ...carts,
            products: carts.products.filter((item) => item.productId !== id),
        })
    }

    const clearCart = async (id: number) => {
        if (!carts) return
        setCarts({
            ...carts,
            products: [],
        })
        await client.updateCart({
            productId: id.toString(),
            payload: [],
        })
    }

    return (
        <CartContext.Provider
            value={{
                carts,
                removeItem,
                updateQuantity,
                isLoading,
                clearCart,
                addToCart,
            }}
        >
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider
