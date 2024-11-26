'use client'

import React from 'react'
import Link from 'next/link'
import { Accordion, Table } from '@mantine/core'
import { Button, LoadingOverlay } from '@/components/atoms'
import { BsArrowDown } from 'react-icons/bs'
import { classNames, formatCurrency } from '@/utils'
import { useCartContext } from '@/providers/cart-provider'
import { TableRow } from '@/components/moleculs'

export default function CartPage() {
    const { carts, isLoading } = useCartContext()

    const subtotal = carts?.products.reduce(
        (sum, item) => sum + (item.product?.price || 0) * item.quantity,
        0
    )
    const tax = (subtotal || 0) * 0.1 // Assuming 10% tax
    const total = (subtotal || 0) + tax

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-8 mt-4">Your Cart</h1>
            {carts?.products.length === 0 ? (
                <p>
                    Your cart is empty.{' '}
                    <Link href="/" className="text-blue-600 hover:underline">
                        Continue shopping
                    </Link>
                </p>
            ) : (
                <>
                    <Table className="mb-12">
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Product</Table.Th>
                                <Table.Th>Price</Table.Th>
                                <Table.Th>Quantity</Table.Th>
                                <Table.Th>Total</Table.Th>
                                <Table.Th></Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody className={classNames(isLoading && 'h-[250px]', 'relative')}>
                            <LoadingOverlay visible={isLoading} />
                            {carts?.products.map((item) => (
                                <TableRow item={item} key={item.productId} />
                            ))}
                        </Table.Tbody>
                    </Table>
                    <div
                        className={classNames(
                            'bottom-0 bg-slate-50 breakout pb-3 border-t border-gray-500',
                            isLoading ? 'relative' : 'sticky'
                        )}
                    >
                        <LoadingOverlay visible={isLoading} />
                        <div className="container mx-auto">
                            <Accordion
                                variant="filled"
                                chevron={<BsArrowDown className={'chevron icon'} />}
                            >
                                <Accordion.Item key={'price'} value={'price'}>
                                    <Accordion.Control className="!px-0">
                                        <div className="text-lg font-bold flex space-x-2">
                                            <span>Total:</span>
                                            <span>
                                                {formatCurrency(total || 0, 'en-US', 'USD')}
                                            </span>
                                        </div>
                                    </Accordion.Control>
                                    <Accordion.Panel>
                                        <div className="space-y-4">
                                            <div className="flex justify-between">
                                                <span>Subtotal:</span>
                                                <span>
                                                    {formatCurrency(subtotal || 0, 'en-US', 'USD')}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Tax (10%):</span>
                                                <span>
                                                    {formatCurrency(tax || 0, 'en-US', 'USD')}
                                                </span>
                                            </div>
                                        </div>
                                    </Accordion.Panel>
                                </Accordion.Item>
                            </Accordion>

                            <div className="mt-4 flex justify-between">
                                <Link href="/products">
                                    <Button variant="outline">Continue Shopping</Button>
                                </Link>
                                <Link href="/checkout">
                                    <Button variant="filled" color="blue">
                                        Proceed to Checkout
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
