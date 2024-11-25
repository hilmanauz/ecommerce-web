import React from 'react'
import { AccountContentProps } from './account-content.types'
import { Button, Heading, Image, LoadingOverlay, Text } from '@/components/atoms'
import { useForm } from 'react-hook-form'
import { notifications } from '@mantine/notifications'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import Link from 'next/link'
import { InputControl } from '@/components/moleculs'
import { em } from '@mantine/core'

export function AccountContent({
    title,
    description,
    onSubmit,
    formData,
    data,
    type,
    submitLabel,
}: AccountContentProps) {
    const isMobile = useMediaQuery(`(max-width: ${em(750)})`)
    const [visible, { open, close }] = useDisclosure(false)
    const { handleSubmit, control, reset } = useForm({
        mode: 'onSubmit',
        defaultValues: data,
    })
    React.useEffect(() => reset(data), [data, reset])
    return (
        <div className="flex flex-col flex-auto items-center justify-center mx-4 relative">
            {isMobile && (
                <div className="absolute inset-0">
                    <div className="w-full relative h-[90%] opacity-20">
                        <Image
                            alt="login-banner"
                            src={`/images/login-banner.png`}
                            objectFit="contain"
                            fill
                            className="w-full h-full top-0 left-0 object-contain rounded-2xl"
                        />
                    </div>
                </div>
            )}
            <div className="mb-4 flex flex-col space-y-3 text-center z-10">
                <Heading order={3}>{title}</Heading>
                <Text fz="sm" color="gray.5">
                    {description}
                </Text>
            </div>
            <form
                onSubmit={handleSubmit(async (value) => {
                    open()
                    notifications.clean()
                    await onSubmit(value, close)
                })}
                noValidate
                className="w-full max-w-lg"
            >
                <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ blur: 2 }} />
                <div className="space-y-4 py-4">
                    {Object.entries(formData).map(([key, val]) => (
                        <InputControl
                            key={key}
                            size={'md'}
                            radius={'md'}
                            control={control}
                            type={val.type}
                            classNames={{
                                input: '!text-sm !leading-6 !tracking-wide',
                            }}
                            leftIcon={<div className="text-xl">{val.leftIcon}</div>}
                            name={key}
                            required
                            label={val.label}
                            options={val.options}
                        />
                    ))}
                    {type === 'sign-in' ? (
                        <div className="flex justify-end w-full">
                            <Link href="/accounts/password/forgot">
                                <Button
                                    variant="white"
                                    color="blue"
                                    className="hover:underline !px-0 !bg-transparent"
                                >
                                    Forgot Password?
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
                <Button
                    type="submit"
                    variant="filled"
                    color="blue"
                    radius={'md'}
                    size="lg"
                    fz={isMobile ? '14px' : 'base'}
                    fullWidth
                    className="mt-1"
                >
                    {submitLabel}
                </Button>
            </form>
            <div className="flex justify-center mt-1">
                {type === 'forgot' ? (
                    <Link href="/accounts/login">
                        <Button variant="white" color="blue" className="hover:underline">
                            Back to Login
                        </Button>
                    </Link>
                ) : (
                    <></>
                )}
            </div>
        </div>
    )
}
