import ProductCard from '@src/components/product/ProductCard'
import type { Product } from '@src/types'

interface ProductListProps {
  products: Product[]
}

export default function ProductList({ products }: ProductListProps) {
  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-4">
      {products.map((product, index) => (
        <li key={product.id}>
          <ProductCard data-index={index} data={product} />
        </li>
      ))}
    </ul>
  )
}
