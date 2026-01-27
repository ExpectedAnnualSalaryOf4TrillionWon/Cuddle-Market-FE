import PlaceholderImage from '@assets/images/placeholder.webp'
import { getImageSrcSet, IMAGE_SIZES, toResizedWebpUrl } from '@src/utils/imageUrl'
import { formatPrice } from '@src/utils/formatPrice'

interface ChatProductCardProps {
  productImageUrl?: string
  productTitle?: string
  productPrice?: number
  size?: 'sm' | 'md'
}

const sizeClasses = {
  sm: 'w-10',
  md: 'w-16',
}

export function ChatProductCard({ productImageUrl, productTitle, productPrice, size = 'sm' }: ChatProductCardProps) {
  return (
    <>
      <div className={`relative aspect-square shrink-0 overflow-hidden rounded-lg ${sizeClasses[size]}`}>
        <img
          src={productImageUrl ? toResizedWebpUrl(productImageUrl, 150) : PlaceholderImage}
          srcSet={productImageUrl ? getImageSrcSet(productImageUrl) : undefined}
          sizes={productImageUrl ? IMAGE_SIZES.tinyThumbnail : undefined}
          fetchPriority="high"
          loading="eager"
          alt={productTitle}
          className="h-full w-full object-cover transition-all duration-300 ease-in-out group-hover:scale-105"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate">{productTitle}</p>
        <p className="font-bold">{formatPrice(Number(productPrice))}원</p>
      </div>
    </>
  )
}
