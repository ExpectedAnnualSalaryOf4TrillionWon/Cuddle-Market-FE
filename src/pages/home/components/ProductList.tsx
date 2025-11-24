import ProductCard from '@src/components/product/ProductCard'
import { PRODUCT_TYPE_TABS, type ProductTypeTabId } from '@src/constants/constants'
import type { Product } from '@src/types'

interface ProductListProps {
  products: Product[]
  totalElements: number
  activeTab: ProductTypeTabId
}

export function ProductList({ products, totalElements, activeTab }: ProductListProps) {
  const activeTabCode = PRODUCT_TYPE_TABS.find((tab) => tab.id === activeTab)?.code

  return (
    <section role="tabpanel" id={`panel-${activeTabCode}`} aria-labelledby={activeTab}>
      <div className="pt-3xl pb-lg">
        <h2 id="product-list-title" className="heading4 text-text-primary">
          전체 상품
        </h2>
        <p className="mt-xs bodySmall text-text-secondary" aria-live="polite">
          {`총 ${totalElements}개의 상품`}
        </p>
      </div>

      <ul className="grid grid-cols-4 gap-4">
        {products.map((product, index) => (
          <li key={product.id}>
            <ProductCard data-index={index} data={product} />
          </li>
        ))}
      </ul>
    </section>
  )
}
