import PlaceholderImage from '@assets/images/placeholder.png'

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
              src={image || PlaceholderImage}
              alt={`${title} - ${idx + 1}`}
              fetchPriority="high"
              loading="eager"
              className="t-0 l-0 absolute h-full w-full object-cover object-top"
            />
          </div>
        ))}
      </div>
    )
  )
}
