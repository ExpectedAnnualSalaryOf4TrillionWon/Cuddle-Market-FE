import { CONDITION_ITEMS, PET_DETAILS, STATUS_EN_TO_KO } from '@constants/constants'
import { CiClock2 } from 'react-icons/ci'
import { GoHeart } from 'react-icons/go'
import { useNavigate } from 'react-router-dom'
import type { Product } from '../../types'
import { ProductThumbnail } from './ProductThumbnail'
import { ProductInfo } from './ProductInfo'

export interface ProductCardProps {
  data: Product
  'data-index'?: number
}

const getPetTypeName = (petDetailCode: string) => {
  const detail = PET_DETAILS.find((detail) => detail.code === petDetailCode)
  return detail?.name || petDetailCode
}

const getProductStatus = (productStatus: string) => {
  const condition = CONDITION_ITEMS.find((status) => status.value === productStatus)
  return condition?.title || productStatus
}

const getTradeStatus = (tradeStatus: string) => {
  const condition = STATUS_EN_TO_KO.find((status) => status.value === tradeStatus)
  return condition?.name || tradeStatus
}

const getTradeStatusColor = (tradeStatus: string) => {
  const condition = STATUS_EN_TO_KO.find((status) => status.value === tradeStatus)
  return condition?.bgColor || 'bg-sale'
}

// Main component
function ProductCard({ data, 'data-index': dataIndex }: ProductCardProps) {
  const navigate = useNavigate()

  if (!data) return null

  const { id, title, price, mainImageUrl, petDetailType, productStatus, tradeStatus, createdAt, favoriteCount } = data
  const petTypeName = getPetTypeName(petDetailType)
  const productStatusName = getProductStatus(productStatus)
  const productTradeName = getTradeStatus(tradeStatus)
  const productTradeColor = getTradeStatusColor(tradeStatus)

  const handleCardClick = () => {
    navigate(`/products/${id}`)
  }

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      ;(e.currentTarget as HTMLDivElement).click()
    }
  }

  return (
    <div
      className="group border-border bg-bg text-text-primary flex cursor-pointer flex-col-reverse overflow-hidden rounded-xl border shadow-md transition-shadow duration-200 hover:shadow-xl"
      onClick={handleCardClick}
      role="button"
      data-index={dataIndex}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <ProductInfo title={title} price={price} createdAt={createdAt} favoriteCount={favoriteCount} />
      <ProductThumbnail
        imageUrl={mainImageUrl}
        title={title}
        petTypeName={petTypeName}
        productStatusName={productStatusName}
        tradeStatus={productTradeName}
        productTradeColor={productTradeColor}
        onLikeClick={handleLikeClick}
      />
    </div>
  )
}

export default ProductCard
