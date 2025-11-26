import { Link } from 'react-router-dom'
import type { Product } from '../../types'
import { ProductThumbnail } from './ProductThumbnail'
import { ProductInfo } from './ProductInfo'
import { ROUTES } from '@src/constants/routes'
import { getTradeStatus } from '@src/utils/getTradeStatus'
import { getPetTypeName } from '@src/utils/getPetTypeName'
import { getProductStatus } from '@src/utils/getProductStatus'
import { getProductType } from '@src/utils/getProductType'
import { getTradeStatusColor } from '@src/utils/getTradeStatusColor'

export interface ProductCardProps {
  data: Product
  'data-index'?: number
}

function ProductCard({ data, 'data-index': dataIndex }: ProductCardProps) {
  if (!data) return null

  const { id, title, price, mainImageUrl, petDetailType, productStatus, tradeStatus, createdAt, favoriteCount, productType } = data
  const petTypeName = getPetTypeName(petDetailType)
  const productStatusName = getProductStatus(productStatus)
  const productTradeName = getTradeStatus(tradeStatus)
  const productTypeName = getProductType(productType)
  const productTradeColor = getTradeStatusColor(tradeStatus)

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }
  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
  //   if (e.key === 'Enter' || e.key === ' ') {
  //     e.preventDefault()
  //     ;(e.currentTarget as HTMLDivElement).click()
  //   }
  // }

  return (
    <Link
      className="border-border bg-bg text-text-primary flex cursor-pointer flex-col-reverse overflow-hidden rounded-xl border shadow-md transition-shadow duration-200 hover:shadow-xl"
      onClick={handleCardClick}
      data-index={dataIndex}
      aria-label={`${title}, ${price}원, ${productStatusName}, ${petTypeName}, ${productTradeName}`}
      // onKeyDown={handleKeyDown}
      to={ROUTES.DETAIL_ID(id)}
    >
      <ProductInfo title={title} price={price} createdAt={createdAt} favoriteCount={favoriteCount} productTypeName={productTypeName} />
      <ProductThumbnail
        imageUrl={mainImageUrl}
        title={title}
        petTypeName={petTypeName}
        productStatusName={productStatusName}
        tradeStatus={productTradeName}
        productTradeColor={productTradeColor}
        onLikeClick={handleLikeClick}
      />
    </Link>
  )
}

export default ProductCard
