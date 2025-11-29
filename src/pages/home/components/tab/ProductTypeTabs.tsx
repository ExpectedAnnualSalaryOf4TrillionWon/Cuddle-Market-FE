import { Button } from '../../../../components/commons/button/Button'
import { PRODUCT_TYPE_TABS, type ProductTypeTabId } from '@src/constants/constants'
import { cn } from '@src/utils/cn'

interface ProductTypeTabsProps {
  activeTab: ProductTypeTabId
  onTabChange: (tabId: ProductTypeTabId) => void
  hideAllTab?: boolean
}

export function ProductTypeTabs({ activeTab, onTabChange, hideAllTab = false }: ProductTypeTabsProps) {
  const tabs = hideAllTab ? PRODUCT_TYPE_TABS.filter((tab) => tab.id !== 'tab-all') : PRODUCT_TYPE_TABS

  return (
    <div role="tablist" aria-label="상품 타입 분류" className={cn('border-b-primary-200 flex gap-2.5 border-b-2 pb-1')}>
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          id={tab.id}
          size="md"
          role="tab"
          type="button"
          onClick={() => onTabChange(tab.id)}
          className={cn(
            'flex-1 cursor-pointer rounded-2xl text-base',
            activeTab === tab.id ? 'bg-primary-300 font-bold text-white' : 'hover:bg-primary-100 text-gray-900'
          )}
          aria-selected={activeTab === tab.id}
          aria-controls={`panel-${tab.code}`}
          tabIndex={activeTab === tab.id ? 0 : -1}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  )
}
