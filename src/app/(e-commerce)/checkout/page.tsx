'use client'

import { Button } from '@/components/atoms'
import { InputControl } from '@/components/moleculs'
import { useCartContext } from '@/providers/cart-provider'
import { formatCurrency } from '@/utils'
import { Divider } from '@mantine/core'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

export default function CheckoutPage() {
    const { handleSubmit, control } = useForm({
        mode: 'onSubmit',
    })

    const { carts } = useCartContext()

    const shipping = 4.99

    const subtotal = carts?.products.reduce(
        (sum, item) => sum + (item.product?.price || 0) * item.quantity,
        0
    )
    const tax = (subtotal || 0) * 0.1 // Assuming 10% tax
    const total = (subtotal || 0) + tax + shipping

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        // Here you would typically handle the checkout process
        console.log('Checkout submitted', data)
    }

    return (
        <div className="container mx-auto mb-8">
            <h1 className="text-3xl font-bold mb-8 mt-4">Checkout</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputControl
                            size={'md'}
                            radius={'md'}
                            control={control}
                            type={'text'}
                            classNames={{
                                input: '!text-sm !leading-6 !tracking-wide',
                            }}
                            name={'first_name'}
                            required
                            label={'First Name'}
                            options={{
                                format: 'string',
                            }}
                        />
                        <InputControl
                            size={'md'}
                            radius={'md'}
                            control={control}
                            type={'text'}
                            classNames={{
                                input: '!text-sm !leading-6 !tracking-wide',
                            }}
                            name={'last_name'}
                            required
                            label={'Last Name'}
                            options={{
                                format: 'string',
                            }}
                        />
                        <div className="md:col-span-2">
                            <InputControl
                                size={'md'}
                                radius={'md'}
                                control={control}
                                type={'text'}
                                classNames={{
                                    input: '!text-sm !leading-6 !tracking-wide',
                                }}
                                name={'address'}
                                required
                                label={'Address'}
                                options={{
                                    format: 'string',
                                }}
                            />
                        </div>
                        <InputControl
                            size={'md'}
                            radius={'md'}
                            control={control}
                            type={'text'}
                            classNames={{
                                input: '!text-sm !leading-6 !tracking-wide',
                            }}
                            name={'city'}
                            required
                            label={'City'}
                            options={{
                                format: 'string',
                            }}
                        />
                        <InputControl
                            size={'md'}
                            radius={'md'}
                            control={control}
                            type={'select'}
                            classNames={{
                                input: '!text-sm !leading-6 !tracking-wide',
                            }}
                            name={'country'}
                            required
                            label={'Country'}
                            options={{
                                data: [
                                    { value: 'us', label: 'United States' },
                                    { value: 'ca', label: 'Canada' },
                                    { value: 'uk', label: 'United Kingdom' },
                                ],
                                withinPortal: true,
                            }}
                        />
                        <InputControl
                            size={'md'}
                            radius={'md'}
                            control={control}
                            type={'text'}
                            classNames={{
                                input: '!text-sm !leading-6 !tracking-wide',
                            }}
                            name={'postal_code'}
                            required
                            label={'Postal Code'}
                            options={{
                                format: 'number',
                            }}
                        />
                    </div>
                </div>

                <Divider />

                <div>
                    <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span>Subtotal:</span>
                            <span>{formatCurrency(subtotal || 0, 'en-US', 'USD')}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Tax:</span>
                            <span>{formatCurrency(tax || 0, 'en-US', 'USD')}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping:</span>
                            <span> {formatCurrency(shipping || 0, 'en-US', 'USD')}</span>
                        </div>
                        <Divider />
                        <div className="flex justify-between text-lg font-bold">
                            <span>Total:</span>
                            <span>{formatCurrency(total || 0, 'en-US', 'USD')}</span>
                        </div>
                    </div>
                </div>

                <Button type="submit" fullWidth variant="filled" color="blue" size="lg">
                    Place Order
                </Button>
            </form>
        </div>
    )
}
