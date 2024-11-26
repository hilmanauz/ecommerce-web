'use client'
import { AccountContent } from '@/components/organisms'
import { notifications } from '@mantine/notifications'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { AiOutlineLock, AiOutlineWarning } from 'react-icons/ai'
import { FaRegUser } from 'react-icons/fa6'

const Login = () => {
    const searchParams = useSearchParams()
    const onSubmit = React.useCallback(
        async (values: Record<string, any>, close: () => void) => {
            const res = await signIn('credentials', {
                ...values,
                redirect: false,
                callbackUrl:
                    searchParams?.get('callbackUrl') ||
                    `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/`,
            })
            if (res?.url) {
                window.location.href = res.url
            } else if (res?.error) {
                close()
                notifications.show({
                    message: res.error,
                    withBorder: true,
                    title: 'Error',
                    color: 'red',
                    icon: <AiOutlineWarning />,
                })
            }
        },
        [searchParams]
    )
    return (
        <section className="flex-auto grid lg:grid-cols-2 grid-cols-1">
            <div className="lg:col-span-1 hidden lg:flex lg:flex-col lg:justify-center lg:items-center bg-sky-100">
                <div className="w-full relative h-[90%]">
                    <Image
                        alt="login-banner"
                        src={`/images/login-banner.png`}
                        objectFit="contain"
                        fill
                        className="w-full h-full top-0 left-0 object-contain rounded-2xl"
                    />
                </div>
            </div>
            <div className="col-span-1 h-full w-full flex bg-white relative">
                <AccountContent
                    title="Log in to your account"
                    description="Please enter your detail"
                    onSubmit={onSubmit}
                    formData={{
                        username: {
                            type: 'text',
                            leftIcon: <FaRegUser />,
                            required: true,
                            options: { format: 'string' },
                        },
                        password: {
                            type: 'password',
                            leftIcon: <AiOutlineLock />,
                            required: true,
                            options: {
                                validation: false,
                            },
                        },
                    }}
                    type="sign-in"
                    submitLabel="Sign in"
                />
            </div>
        </section>
    )
}

export default Login
