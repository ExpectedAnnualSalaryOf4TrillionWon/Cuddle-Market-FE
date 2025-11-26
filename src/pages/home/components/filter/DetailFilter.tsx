import { memo } from 'react'
import { DetailFilterButton } from './DetailFilterButton'
import { ProductStateFilter } from '../../../../components/commons/filters/ProductStateFilter'
import { PriceFilter } from '../../../../components/commons/filters/PriceFilter'
import { LocationFilter } from '../../../../components/commons/filters/LocationFilter'
import type { PriceRange, LocationFilter as LocationFilterType } from '@src/constants/constants'

interface DetailFilterProps {
  isOpen: boolean
  onToggle: (isOpen: boolean) => void
  selectedProductStatus?: string | null
  onProductStatusChange?: (status: string | null) => void
  selectedPriceRange?: PriceRange | null
  onMinPriceChange?: (priceRange: PriceRange | null) => void
  onLocationChange?: (location: LocationFilterType | null) => void
}

export const DetailFilter = memo(function DetailFilterSection({
  isOpen,
  onToggle,
  selectedProductStatus,
  onProductStatusChange,
  selectedPriceRange,
  onMinPriceChange,
  onLocationChange,
}: DetailFilterProps) {
  return (
    <div className="flex flex-col gap-2.5">
      <DetailFilterButton isOpen={isOpen} onClick={() => onToggle(!isOpen)} ariaControls="detail-filter-content" />
      {isOpen && (
        <div className="bg-primary-100 flex gap-10 rounded-lg px-3 py-2.5" role="group" id="detail-filter-content" aria-label="세부 필터 옵션">
          <ProductStateFilter selectedProductStatus={selectedProductStatus} onProductStatusChange={onProductStatusChange} />
          <PriceFilter selectedPriceRange={selectedPriceRange} onMinPriceChange={onMinPriceChange} />
          <LocationFilter onLocationChange={onLocationChange} />
        </div>
      )}
    </div>
  )
})
