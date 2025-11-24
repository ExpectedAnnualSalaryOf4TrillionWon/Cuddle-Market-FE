const formatPrice = (price: number): string => {
  return `${Math.floor(price).toLocaleString()}`
}

interface ProductHeadingProps {
  title: string
  price: number
}

export function ProductHeading({ title, price }: ProductHeadingProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="heading-h5 line-clamp line-1 text-gray-900">{title}</span>
      <p className="text-primary-300 flex items-center font-bold">
        <span className="max-w-[90%] overflow-hidden">{formatPrice(price)}</span>원
      </p>
    </div>
  )
}
