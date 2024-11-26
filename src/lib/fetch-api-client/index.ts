import { FetchApiProps } from './types'
import { signOut } from 'next-auth/react'

export const ApiClient: FetchApiProps = (client) => {
    return {
        getData: async (api) => {
            try {
                const data = await client.get(api)
                return data
            } catch (error) {
                const errorData = error as {
                    response: {
                        data: { code: number }
                    }
                }
                if (errorData.response.data.code === 401)
                    signOut({
                        callbackUrl: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/accounts/login`,
                    })
            }
        },
        updateCart: async (props) => {
            const { productId, ...payload } = props
            const { data } = await client.put(`/carts/${productId}`, payload.payload)
            return data
        },
    }
}
