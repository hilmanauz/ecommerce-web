'use client'
import { Button, Image } from '@/components/atoms'
import React from 'react'
import { ProductDetailProps } from './product-detail.types'
import { formatCurrency } from '@/utils'
import { FaCartPlus, FaStar } from 'react-icons/fa6'

export function ProductDetail({ data }: ProductDetailProps) {
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
                <Button
                    leftSection={<FaCartPlus size={16} />}
                    size="lg"
                    color="blue"
                    variant="filled"
                    fullWidth
                >
                    Add to Cart
                </Button>
            </div>
        </div>
    )
}
