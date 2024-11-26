'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function useQueryParams<T = {}>() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const urlSearchParams = new URLSearchParams(searchParams?.toString())

    function setQueryParams(params: Partial<T>) {
        Object.entries(params).forEach(([key, value]) => {
            urlSearchParams.set(key, String(value))
        })

        const search = urlSearchParams.toString()
        const query = search ? `?${search}` : ''

        router.push(`${pathname}${query}`)
    }

    function removeQueryParams(params: Array<string>) {
        params.forEach((key) => {
            urlSearchParams.delete(key)
        })

        const search = urlSearchParams.toString()
        const query = search ? `?${search}` : ''

        router.push(`${pathname}${query}`)
    }

    return { queryParams: searchParams, setQueryParams, removeQueryParams }
}
