import { AxiosInstance, AxiosResponse } from 'axios'

export type ResponseAPIProps<T> = AxiosResponse<T, T> | undefined

export type FetcherApi = {
    getData: <T extends Record<string, any>>(api: string) => Promise<ResponseAPIProps<T>>
}

export type FetchApiProps = (props: AxiosInstance) => FetcherApi
