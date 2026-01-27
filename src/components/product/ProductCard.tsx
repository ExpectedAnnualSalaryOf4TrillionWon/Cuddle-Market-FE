import { Link } from 'react-router-dom'
import type { Product } from '@src/types'
import { ProductThumbnail } from './components/ProductThumbnail'
import { ProductInfo } from './components/ProductInfo'
import { ROUTES } from '@src/constants/routes'
import { getTradeStatus } from '@src/utils/getTradeStatus'
import { getPetTypeName } from '@src/utils/getPetTypeName'
import { getProductStatus } from '@src/utils/getProductStatus'
import { getProductType } from '@src/utils/getProductType'
import { getTradeStatusColor } from '@src/utils/getTradeStatusColor'
import { useFavorite } from '@src/hooks/useFavorite'

export interface ProductCardProps {
  data: Product
  'data-index'?: number
}

function ProductCard({ data, 'data-index': dataIndex }: ProductCardProps) {
  const { isFavorite, handleToggleFavorite } = useFavorite({
    productId: data?.id,
    initialIsFavorite: data?.isFavorite ?? false,
  })

  if (!data) return null

  const { id, title, price, mainImageUrl, petDetailType, productStatus, tradeStatus, createdAt, favoriteCount, productType } = data
  const petTypeName = getPetTypeName(petDetailType)
  const productStatusName = getProductStatus(productStatus)
  const productTradeName = getTradeStatus(tradeStatus)
  const productTypeName = getProductType(productType)
  const productTradeColor = getTradeStatusColor(tradeStatus)
  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Link
      className="border-border text-text-primary flex cursor-pointer flex-row-reverse overflow-hidden rounded-xl border bg-white shadow-md transition-shadow duration-200 hover:shadow-xl md:flex-col-reverse"
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
        productTypeName={productTypeName}
        productStatusName={productStatusName}
        tradeStatus={productTradeName}
        productTradeColor={productTradeColor}
        isFavorite={isFavorite}
        onLikeClick={handleToggleFavorite}
      />
    </Link>
  )
}

export default ProductCard
