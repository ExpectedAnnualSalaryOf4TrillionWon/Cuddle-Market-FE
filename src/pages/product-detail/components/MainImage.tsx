import PlaceholderImage from '@assets/images/placeholder.webp'
import { getImageSrcSet, IMAGE_SIZES, toResizedWebpUrl } from '@src/utils/imageUrl'

interface MainImageProps {
  mainImageUrl: string | null
  title: string
}

export default function MainImage({ mainImageUrl, title }: MainImageProps) {
  return (
    <div className="relative overflow-hidden rounded-xl pb-[100%]">
      <img
        src={mainImageUrl ? toResizedWebpUrl(mainImageUrl, 800) : PlaceholderImage}
        srcSet={mainImageUrl ? getImageSrcSet(mainImageUrl) : undefined}
        sizes={IMAGE_SIZES.mainImage}
        alt={title}
        fetchPriority="high"
        loading="eager"
        onError={(e) => {
          const img = e.currentTarget
          // 리사이즈 이미지 실패 시 원본 URL로 fallback
          if (mainImageUrl && img.src !== mainImageUrl) {
            img.srcset = ''
            img.src = mainImageUrl
          } else {
            img.src = PlaceholderImage
          }
        }}
        className="t-0 l-0 absolute h-full w-full object-cover"
      />
    </div>
  )
}
