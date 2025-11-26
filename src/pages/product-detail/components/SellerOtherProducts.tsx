import type { Product } from '@src/types'
import { Package } from 'lucide-react'
import ProductList from '@src/components/commons/product/ProductList'
import { EmptyState } from '@src/components/commons/EmptyState'

interface SellerOtherProductsProps {
  sellerOtherProducts: Product[]
  sellerInfo: {
    sellerId: number
    sellerNickname: string
    sellerProfileImageUrl: string
  }
}

export default function SellerOtherProducts({ sellerInfo, sellerOtherProducts }: SellerOtherProductsProps) {
  return (
    <div className="pb-4xl">
      <h3 className="heading-h3 text-text-primary mb-lg">{sellerInfo?.sellerNickname}님의 다른 판매 상품</h3>

      {sellerOtherProducts?.length !== 0 ? (
        <ProductList products={sellerOtherProducts} />
      ) : (
        <EmptyState
          icon={Package}
          title="등록된 다른 상품이 없어요"
          description={`${sellerInfo?.sellerNickname}님이 판매 중인 다른 상품이 아직 없습니다.`}
        />
      )}
    </div>
  )
}
