import React from 'react'
import { TableRowProps } from './table-row.types'
import { Table } from '@mantine/core'
import { Button, Image, Text, TextInput } from '@/components/atoms'
import { formatCurrency, handlePreventAlphabet } from '@/utils'
import { BsTrash2 } from 'react-icons/bs'
import { useCartContext } from '@/providers/cart-provider'
import { useDebouncedCallback } from '@mantine/hooks'

export function TableRow({ item }: TableRowProps) {
    const { updateQuantity, removeItem } = useCartContext()
    const [quantity, setQuantity] = React.useState(item.quantity)
    React.useEffect(() => {
        setQuantity(item.quantity)
    }, [item.quantity])
    const handleChangeQuantity = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        updateQuantity(item.productId, quantity)
    }, 1000)
    return (
        <Table.Tr>
            <Table.Td className="font-medium">
                <div className="flex items-center space-x-3">
                    <Image src={item.product?.image || ''} w={50} h={50} className="rounded-md" />
                    <span>{item.product?.title}</span>
                </div>
            </Table.Td>
            <Table.Td>{formatCurrency(item.product?.price || 0, 'en-US', 'USD')}</Table.Td>
            <Table.Td>
                <TextInput
                    type="number"
                    min="0"
                    value={quantity}
                    onKeyDown={handlePreventAlphabet}
                    onChange={(e) => {
                        setQuantity(parseInt(e.target.value))
                        handleChangeQuantity(e)
                    }}
                    className="w-20"
                />
            </Table.Td>
            <Table.Td className="max-w-10">
                <Text>
                    {formatCurrency((item.product?.price || 0) * item.quantity, 'en-US', 'USD')}
                </Text>
            </Table.Td>
            <Table.Td>
                <Button
                    variant="subtle"
                    size="compact-md"
                    color="red"
                    onClick={() => removeItem(item.productId)}
                >
                    <BsTrash2 className="h-4 w-4" />
                    <span className="sr-only">Remove item</span>
                </Button>
            </Table.Td>
        </Table.Tr>
    )
}
