import { ProductProps } from '@/components/templates/products/products.type'

export type TableRowProps = {
    item: {
        productId: number
        quantity: number
        product?: ProductProps
    }
}
