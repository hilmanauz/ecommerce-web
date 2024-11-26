import React from 'react'
import _ from 'lodash'
import axios, { CreateAxiosDefaults } from 'axios'
import { ApiClient } from '@/lib'

type ApiTokenProps = {
    token?: string
}

const FetchApiContext = React.createContext<ApiTokenProps>({})

export const useFetchApiContext = () => React.useContext(FetchApiContext)

export const useFetchApi = (props?: {
    otherProps?: Omit<CreateAxiosDefaults<any>, 'headers' | 'baseURL'>
    customHeaders?: {
        [key: string]: string
    }
}) => {
    const client = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
        headers: {
            ...(props?.customHeaders || {}),
        },
        ...props?.otherProps,
        timeout: 30000,
    })

    return ApiClient(client)
}

const FetchApiProvider = (
    props: {
        children: React.ReactNode
    } & ApiTokenProps
) => {
    const { children, ...token } = props

    return <FetchApiContext.Provider value={{ ...token }}>{children}</FetchApiContext.Provider>
}

export default FetchApiProvider
