import { ProductBadge } from './ProductBadge'
import { Button } from '../commons/button/Button'
import { Heart } from 'lucide-react'
import { Badge } from '../commons/badge/Badge'
import bowl from '@assets/images/bowl.jpg'

interface ProductThumbnailProps {
  imageUrl: string
  title: string
  petTypeName: string
  productStatusName: string
  tradeStatus: string
  productTradeColor: string
  onLikeClick: (e: React.MouseEvent) => void
}

export function ProductThumbnail({
  imageUrl,
  title,
  petTypeName,
  productStatusName,
  tradeStatus,
  productTradeColor,
  onLikeClick,
}: ProductThumbnailProps) {
  return (
    <div className="relative overflow-hidden pb-[75%]">
      <div className="top-sm px-sm absolute flex w-full justify-between">
        <ProductBadge petTypeName={petTypeName} productStatusName={productStatusName} />
        <Button
          type="button"
          className="z-1 flex cursor-pointer items-center justify-center rounded-full bg-gray-100"
          aria-label="찜하기"
          icon={Heart}
          size="xs"
        />
      </div>
      <Badge className={`bottom-sm right-sm absolute z-1 text-white ${productTradeColor}`}>{tradeStatus}</Badge>
      <img
        src={imageUrl || bowl}
        alt={title}
        className="t-0 l-0 absolute h-full w-full object-cover transition-all duration-300 ease-in-out group-hover:scale-105"
      />
    </div>
  )
}
