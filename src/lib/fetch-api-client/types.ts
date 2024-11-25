import { AxiosInstance } from 'axios'

export type ResponseAPIProps<T extends Record<string, any> = Record<string, any>> = {
    code: 200 | 400 | 500 | 404
    data: T
    message: string
    status: 'success' | 'error'
}

interface Props {
    baseURL?: string
    customHeaders?: {
        [key: string]: string
    }
}

export type FetcherApi = {
    getData: (api: string) => Promise<ResponseAPIProps>
}

export type FetchApiProps = (props: AxiosInstance) => FetcherApi
