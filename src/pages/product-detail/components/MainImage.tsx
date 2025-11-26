import PlaceholderImage from '@assets/images/placeholder.png'

interface MainImageProps {
  mainImageUrl: string | null
  title: string
}

export default function MainImage({ mainImageUrl, title }: MainImageProps) {
  return (
    <div className="relative overflow-hidden rounded-xl pb-[100%]">
      <img src={mainImageUrl || PlaceholderImage} alt={title} className="t-0 l-0 absolute h-full w-full object-cover" />
    </div>
  )
}
