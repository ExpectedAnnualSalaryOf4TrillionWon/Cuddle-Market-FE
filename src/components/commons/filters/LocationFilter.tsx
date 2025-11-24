import { useState, useEffect } from 'react'
import { SelectDropdown } from '../select/SelectDropdown'
import { CITIES, PROVINCES } from '@src/constants/cities'
import { cn } from '@src/utils/cn'
import type { Province } from '@src/constants/cities'
import type { LocationFilter as LocationFilterType } from '@src/constants/constants'

interface LocationFilterProps {
  headingClassName?: string
  onLocationChange?: (location: LocationFilterType | null) => void
}

export function LocationFilter({ headingClassName, onLocationChange }: LocationFilterProps) {
  const [selectedSido, setSelectedSido] = useState<Province | ''>('')
  const [selectedGugun, setSelectedGugun] = useState('')

  // 선택된 시/도에 따른 구/군 목록
  const availableGugun = selectedSido ? CITIES[selectedSido] || [] : []

  // 시/도나 구/군이 변경되면 부모에게 알림
  useEffect(() => {
    if (selectedSido) {
      // 시/도가 있으면 필터 전달 (구/군은 선택 안 했을 수도 있음)
      onLocationChange?.({
        sido: selectedSido,
        gugun: selectedGugun || null,
      })
    } else {
      // 시/도가 없으면 null 전달
      onLocationChange?.(null)
    }
  }, [selectedSido, selectedGugun, onLocationChange])

  // 시/도가 변경되면 구/군 초기화
  const handleSidoChange = (value: string) => {
    setSelectedSido(value as Province | '')
    setSelectedGugun('') // 구/군 초기화
  }

  return (
    <div className="flex flex-1 flex-col gap-2">
      <span id="location-filter-heading" className={cn('heading-h5', headingClassName)}>
        지역
      </span>
      <div className="flex gap-2.5" role="group" aria-labelledby="location-filter-heading">
        {/* 시/도 선택 */}
        <div className="flex-1">
          <SelectDropdown
            value={selectedSido}
            onChange={handleSidoChange}
            options={PROVINCES.map((province) => ({
              value: province,
              label: province,
            }))}
            placeholder="시/도 선택"
            buttonClassName="border-0 bg-primary-50 text-gray-900 px-3 py-2"
          />
        </div>

        {/* 구/군 선택 */}
        <div className="flex-1">
          <span id="gugun-description" className="sr-only">
            시/도 선택 후 이용 가능합니다
          </span>
          <SelectDropdown
            value={selectedGugun}
            onChange={(value: string) => setSelectedGugun(value)}
            options={availableGugun.map((gugun) => ({
              value: gugun,
              label: gugun,
            }))}
            placeholder={selectedSido ? '시/군/구 선택' : '시/도를 먼저 선택해주세요'}
            disabled={!selectedSido}
            buttonClassName="border-0 disabled:bg-primary-50 bg-primary-50 text-gray-900 px-3 py-2 disabled:text-gray-500"
          />
        </div>
      </div>
    </div>
  )
}
