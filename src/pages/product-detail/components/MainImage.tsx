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
        className="t-0 l-0 absolute h-full w-full object-cover"
      />
    </div>
  )
}
