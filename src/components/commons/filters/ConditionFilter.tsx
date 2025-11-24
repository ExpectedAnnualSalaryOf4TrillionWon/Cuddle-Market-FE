import { Button } from '../button/Button'
import { CONDITION_ITEMS } from '@src/constants/constants'
import { cn } from '@src/utils/cn'
import { useSearchParams } from 'react-router-dom'

interface ConditionFilterProps {
  headingClassName?: string
  selectedProductStatus?: string | null
  onProductStatusChange?: (status: string | null) => void
}

export function ConditionFilter({ headingClassName, selectedProductStatus, onProductStatusChange }: ConditionFilterProps) {
  const [, setSearchParams] = useSearchParams()

  const handleProductStatuses = (e: React.MouseEvent, value: string) => {
    e.stopPropagation() // 이벤트 버블링 방지
    // 같은 상태 클릭 시 선택 해제, 다른 상태 클릭 시 선택
    const isDeselecting = selectedProductStatus === value
    setSearchParams((prev) => {
      if (isDeselecting) {
        prev.delete('categories') // 선택 해제 시 URL에서 제거
      } else {
        prev.set('categories', value) // 선택 시 URL에 추가
      }
      return prev
    })

    onProductStatusChange?.(isDeselecting ? null : value)
  }

  return (
    <div className="flex flex-col gap-2">
      <span id="condition-filter-heading" className={cn('heading-h5', headingClassName)}>
        상품 상태
      </span>
      <div className="flex flex-wrap gap-2.5" role="group" aria-labelledby="condition-filter-heading">
        {CONDITION_ITEMS.map((item) => (
          <Button
            key={item.value}
            type="button"
            size="sm"
            className={cn(
              'bg-primary-50 cursor-pointer',
              selectedProductStatus === item.value ? 'bg-primary-300 font-bold text-white' : 'hover:bg-primary-300 text-gray-900 hover:text-white'
            )}
            onClick={(e) => handleProductStatuses(e, item.value)}
            aria-pressed={selectedProductStatus === item.value}
          >
            {item.title}
          </Button>
        ))}
      </div>
    </div>
  )
}
