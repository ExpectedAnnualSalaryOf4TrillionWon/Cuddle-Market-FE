import { Button } from '@src/components/commons/button/Button'
import { PET_DETAILS, PET_TYPE_TABS, PETS, type PetTypeTabId } from '@src/constants/constants'
import { cn } from '@src/utils/cn'
import { ProductPetTypeTabs } from '../tab/ProductPetTypeTabs'
import { useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useMediaQuery } from '@src/hooks/useMediaQuery'

const INITIAL_DISPLAY_COUNT = 9

interface PetTypeFilterProps {
  activeTab: PetTypeTabId
  onTabChange: (tabId: PetTypeTabId) => void
  headingClassName?: string
  selectedDetailPet?: string | null
  onPetDetailTypeChange?: (category: string | null) => void
}

export function PetTypeFilter({ activeTab, headingClassName, selectedDetailPet, onPetDetailTypeChange, onTabChange }: PetTypeFilterProps) {
  const [, setSearchParams] = useSearchParams()
  const [showAll, setShowAll] = useState(false)
  const isMobile = useMediaQuery('(max-width: 767px)')

  useEffect(() => {
    setShowAll(false)
  }, [activeTab])

  const handleProductPetDetailType = (e: React.MouseEvent, pet: string) => {
    e.stopPropagation() // 이벤트 버블링 방지

    // 같은 반려동물 클릭 시 선택 해제, 다른 반려동물 클릭 시 선택
    const isDeselecting = selectedDetailPet === pet

    setSearchParams((prev) => {
      if (isDeselecting) {
        prev.delete('petDetailType') // 선택 해제 시 URL에서 제거
      } else {
        prev.set('petDetailType', pet) // 선택 시 URL에 추가
      }
      return prev
    })

    onPetDetailTypeChange?.(isDeselecting ? null : pet)
  }
  const selectedPetTypeCode = PET_TYPE_TABS.find((tab) => tab.id === activeTab)?.code

  // 선택된 반려동물 타입에 해당하는 details만 필터링
  const filteredPetDetails =
    selectedPetTypeCode === 'ALL'
      ? PET_DETAILS // 전체 선택 시 모든 details 표시
      : PET_DETAILS.filter((pet) => PETS.find((petType) => petType.code === selectedPetTypeCode)?.details.some((detail) => detail.code === pet.code))

  // 모바일 + "전체" 탭일 때만 더보기 기능 적용 (데스크탑은 항상 전체 표시)
  const displayedPetDetails =
    isMobile && selectedPetTypeCode === 'ALL' && !showAll
      ? filteredPetDetails.slice(0, INITIAL_DISPLAY_COUNT)
      : filteredPetDetails

  const hasMoreItems =
    isMobile && selectedPetTypeCode === 'ALL' && filteredPetDetails.length > INITIAL_DISPLAY_COUNT

  return (
    <div className="flex flex-col gap-2.5">
      <span className={cn('heading-h4', headingClassName)}>반려동물 종류</span>
      <div className="flex flex-col gap-4">
        <ProductPetTypeTabs activeTab={activeTab} onTabChange={onTabChange} />
        <div className="flex flex-wrap gap-2.5" role="tabpanel" id={`panel-${selectedPetTypeCode}`} aria-labelledby={activeTab}>
          {displayedPetDetails.map((pet) => (
            <Button
              key={pet.code}
              type="button"
              size="sm"
              className={cn(
                'bg-primary-100 cursor-pointer',
                selectedDetailPet === pet.code ? 'bg-primary-300 font-bold text-white' : 'hover:bg-primary-300 text-gray-900 hover:text-white'
              )}
              onClick={(e) => handleProductPetDetailType(e, pet.code)}
              aria-pressed={selectedDetailPet === pet.code}
            >
              {pet.name}
            </Button>
          ))}
          {hasMoreItems && !showAll && (
            <Button
              type="button"
              size="sm"
              className="cursor-pointer bg-gray-100 text-gray-600 md:hidden"
              onClick={() => setShowAll(true)}
            >
              더보기 ({filteredPetDetails.length - INITIAL_DISPLAY_COUNT}개)
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
