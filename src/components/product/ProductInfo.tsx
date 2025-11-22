import { ProductHeading } from './ProductHeading'
import { ProductMeta } from './ProductMeta'

interface ProductInfoProps {
  title: string
  price: number
  createdAt: string
  favoriteCount: number
}

export function ProductInfo({ title, price, createdAt, favoriteCount }: ProductInfoProps) {
  return (
    <div className="flex h-full flex-col justify-between gap-5 p-3">
      <ProductHeading title={title} price={price} />
      <ProductMeta createdAt={createdAt} favoriteCount={favoriteCount} />
    </div>
  )
}
