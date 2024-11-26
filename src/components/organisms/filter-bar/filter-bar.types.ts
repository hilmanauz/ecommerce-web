import { ProductProps } from '@/components/templates/products/products.type'

export type CartProps = {
    date: string
    userId: number
    id?: number
    products: Array<{ productId: number; quantity: number; product?: ProductProps }>
}
