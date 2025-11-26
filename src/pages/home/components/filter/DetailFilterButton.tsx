import { Funnel as FilterIcon, ChevronDown as DownArrow } from 'lucide-react'
import { cn } from '@src/utils/cn'

interface DetailFilterToggleProps {
  isOpen: boolean
  onClick: () => void
  ariaControls?: string
}

export function DetailFilterButton({ isOpen, onClick, ariaControls }: DetailFilterToggleProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={isOpen}
      aria-controls={ariaControls}
      aria-label={isOpen ? '세부 필터 닫기' : '세부 필터 열기'}
      className={cn('bg-primary-100 flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 transition-all')}
    >
      <div className={cn('flex items-center gap-2')}>
        <FilterIcon className={cn('h-4 w-4')} aria-hidden="true" />
        <span className={cn('heading-h4')}>세부 필터</span>
        <p className={cn('bg-primary-50 items-center justify-center overflow-hidden rounded-md px-3 py-1 text-sm')} aria-hidden="true">
          상품상태 · 가격대 · 지역
        </p>
      </div>
      <DownArrow className={cn('h-6 w-6 text-gray-900 transition-transform', isOpen && 'rotate-180')} strokeWidth={2} aria-hidden="true" />
    </button>
  )
}
