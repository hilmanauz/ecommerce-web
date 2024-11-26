import { ProductDetail } from '@/components/templates'

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
    const responseProductDetail = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${params.id}`,
        {
            method: 'GET',
        }
    )
    const dataProductDetail = await responseProductDetail.json()
    return <ProductDetail data={dataProductDetail} />
}
