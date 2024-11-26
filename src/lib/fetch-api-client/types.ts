import { CartProps } from '@/components/organisms/filter-bar/filter-bar.types'
import { AxiosInstance, AxiosResponse } from 'axios'

export type ResponseAPIProps<T extends Record<string, any> = Record<string, any>> =
    | AxiosResponse<T, T>
    | undefined

export type FetcherApi = {
    getData: <T extends Record<string, any>>(api: string) => Promise<ResponseAPIProps<T>>
    updateCart: ({
        productId,
        payload,
    }: {
        productId: string
        payload: CartProps | []
    }) => Promise<ResponseAPIProps>
}

export type FetchApiProps = (props: AxiosInstance) => FetcherApi
