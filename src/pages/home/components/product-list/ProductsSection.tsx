import { SelectDropdown } from '@src/components/commons/select/SelectDropdown'
import ProductCard from '@src/components/product/ProductCard'
import { PRODUCT_TYPE_TABS, SORT_TYPE, type ProductTypeTabId, type SORT_LABELS } from '@src/constants/constants'
import type { Product } from '@src/types'
import { useSearchParams } from 'react-router-dom'

interface ProductListHeaderProps {
  totalElements: number
}

function ProductListHeader({ totalElements }: ProductListHeaderProps) {
  return (
    <div className="pt-3xl pb-lg">
      <h2 id="product-list-title" className="heading4 text-text-primary">
        전체 상품
      </h2>
      <p className="mt-xs bodySmall text-text-secondary" aria-live="polite">
        {`총 ${totalElements}개의 상품`}
      </p>
    </div>
  )
}

interface ProductListProps {
  products: Product[]
}

function ProductList({ products }: ProductListProps) {
  return (
    <ul className="grid grid-cols-4 gap-4">
      {products.map((product, index) => (
        <li key={product.id}>
          <ProductCard data-index={index} data={product} />
        </li>
      ))}
    </ul>
  )
}

interface ProductsSectionProps {
  products: Product[]
  totalElements: number
  activeTab: ProductTypeTabId
  selectedSort?: SORT_LABELS
  setSelectedSort?: (sort: string) => void
  onSortChange?: (sort: SORT_LABELS) => void
}

export function ProductsSection({
  products,
  totalElements,
  activeTab,
  selectedSort = '최신순',
  setSelectedSort,
  onSortChange,
}: ProductsSectionProps) {
  const [, setSearchParams] = useSearchParams()

  const activeTabCode = PRODUCT_TYPE_TABS.find((tab) => tab.id === activeTab)?.code

  const handleSortChange = (value: string) => {
    const sortItem = SORT_TYPE.find((sort) => sort.label === value)

    if (!sortItem) return
    setSearchParams((prev) => {
      switch (sortItem.id) {
        case 'orderedLowPriced':
          prev.set('sortBy', 'price')
          prev.set('sortOrder', 'asc')
          break
        case 'orderedHighPriced':
          prev.set('sortBy', 'price')
          prev.set('sortOrder', 'desc')
          break
        default:
          prev.set('sortBy', sortItem.id)
          prev.delete('sortOrder')
      }
      return prev
    })
    setSelectedSort?.(sortItem.label)
    onSortChange?.(value as SORT_LABELS)
  }

  return (
    <section role="tabpanel" id={`panel-${activeTabCode}`} aria-labelledby={activeTab}>
      <ProductListHeader totalElements={totalElements} />
      <SelectDropdown
        value={selectedSort}
        onChange={handleSortChange}
        options={SORT_TYPE.map((sort) => ({
          value: sort.label,
          label: sort.label,
        }))}
        buttonClassName="border-0 bg-primary-50 text-gray-900 px-3 py-2"
      />
      <ProductList products={products} />
    </section>
  )
}
