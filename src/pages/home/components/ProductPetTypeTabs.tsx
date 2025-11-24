import { Button } from '../../../components/commons/button/Button'
import { PET_TYPE_TABS, type PetTypeTabId } from '@src/constants/constants'
import { cn } from '@src/utils/cn'

interface ProductPetTypeTabsProps {
  activeTab: PetTypeTabId
  onTabChange: (tabId: PetTypeTabId) => void
}

export function ProductPetTypeTabs({ activeTab, onTabChange }: ProductPetTypeTabsProps) {
  return (
    <div role="tablist" aria-label="반려동물 타입 대분류" className={cn('border-b-primary-200 flex gap-2.5 border-b-2 pb-1')}>
      {PET_TYPE_TABS.map((tab) => (
        <Button
          key={tab.id}
          size="md"
          id={tab.id}
          type="button"
          onClick={() => onTabChange(tab.id)}
          className={cn(
            'flex-1 cursor-pointer rounded-2xl text-base',
            activeTab === tab.id ? 'bg-primary-300 font-bold text-white' : 'hover:bg-primary-100 text-gray-900'
          )}
          role="tab"
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
