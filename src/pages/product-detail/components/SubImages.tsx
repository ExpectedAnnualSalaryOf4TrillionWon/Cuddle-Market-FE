import { getImageSrcSet, IMAGE_SIZES, toResizedWebpUrl, PLACEHOLDER_IMAGES, PLACEHOLDER_SRCSET } from '@src/utils/imageUrl'

interface SubImagesProps {
  mainImageUrl: string
  subImageUrls: string[]
  title: string
}

export default function SubImages({ mainImageUrl, subImageUrls, title }: SubImagesProps) {
  return (
    mainImageUrl &&
    subImageUrls.length > 0 && (
      <div className="grid grid-cols-4 gap-2">
        {subImageUrls.map((image, idx) => (
          <div key={idx} className="relative overflow-hidden rounded-lg bg-white pb-[100%]">
            <img
              src={image ? toResizedWebpUrl(image, 400) : PLACEHOLDER_IMAGES[400]}
              srcSet={image ? getImageSrcSet(image) : PLACEHOLDER_SRCSET}
              sizes={IMAGE_SIZES.subImages}
              alt={`${title} - ${idx + 1}`}
              fetchPriority="high"
              loading="eager"
              onError={(e) => {
                const img = e.currentTarget
                // 리사이즈 이미지 실패 시 원본 URL로 fallback
                if (image && img.src !== image) {
                  img.srcset = ''
                  img.src = image
                } else {
                  img.srcset = PLACEHOLDER_SRCSET
                  img.src = PLACEHOLDER_IMAGES[400]
                }
              }}
              className="t-0 l-0 absolute h-full w-full object-cover object-top"
            />
          </div>
        ))}
      </div>
    )
  )
}
