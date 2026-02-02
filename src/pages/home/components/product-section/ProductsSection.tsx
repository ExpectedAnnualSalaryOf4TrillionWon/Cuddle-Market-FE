import ProductList from '@src/components/product/ProductList'
import { SelectDropdown } from '@src/components/commons/select/SelectDropdown'
import { PRODUCT_TYPE_TABS, SORT_TYPE, type ProductTypeTabId, type SORT_LABELS } from '@src/constants/constants'
import type { Product } from '@src/types'
import { useSearchParams } from 'react-router-dom'

interface ProductListHeaderProps {
  totalElements: number
}

function ProductListHeader({ totalElements }: ProductListHeaderProps) {
  return (
    <p className="text-text-secondary" aria-live="polite">
      {`총 ${totalElements}개의 상품`}
    </p>
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
    <section role="tabpanel" id={`panel-${activeTabCode}`} aria-labelledby={activeTab} className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <ProductListHeader totalElements={totalElements} />
        <div className="w-36">
          <SelectDropdown
            value={selectedSort}
            onChange={handleSortChange}
            options={SORT_TYPE.map((sort) => ({
              value: sort.label,
              label: sort.label,
            }))}
            buttonClassName="border-0 bg-primary-50 text-gray-900 px-3 py-2"
          />
        </div>
      </div>
      <ProductList products={products} />
    </section>
  )
}
