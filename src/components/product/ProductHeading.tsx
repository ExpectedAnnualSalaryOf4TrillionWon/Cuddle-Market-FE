const formatPrice = (price: number): string => {
  return `${Math.floor(price).toLocaleString()}`
}

interface ProductHeadingProps {
  title: string
  price: number
  productTypeName: string
}

export function ProductHeading({ title, price, productTypeName }: ProductHeadingProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="heading-h5 line-clamp line-1 text-gray-900">{title}</span>
      <p className="flex w-full flex-col">
        <p className="font-semibold text-gray-500">{productTypeName}</p>
        <p className="text-primary-300 max-w-[90%] overflow-hidden font-bold">
          <span>{formatPrice(price)}</span>원
        </p>
      </p>
    </div>
  )
}
