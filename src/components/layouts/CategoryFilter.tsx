import { useEffect, useRef, useState } from 'react'
import type { FilterApiResponse, FilterState } from 'src/types'
import { fetchAllCategory } from '../../api/products'

export function CategoryFilter({ onFilterChange }: { onFilterChange: (filters: FilterState) => void }) {
  const [filterData, setFilterData] = useState<FilterApiResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  /**반려동물 종류 */
  // 대분류
  const [selectedPetType, setSelectedPetType] = useState<string>('ALL')
  // 소분류(세부 분류)
  const [selectedPetDetails, setSelectedPetDetails] = useState<string[]>([])

  /**상품 카테고리 */
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  /**가격 */
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([])

  /**상품 상태 */
  const [selectedConditions, setSelectedConditions] = useState<string[]>([])

  /**거주지 */
  const [selectedState, setSelectedState] = useState<string | null>(null)
  const [selectedCity, setSelectedCity] = useState<string | null>(null)
  const [showStateDropdown, setShowStateDropdown] = useState(false)
  const [showCityDropdown, setShowCityDropdown] = useState(false)

  /** 거주지 선택창 */
  const stateBoxRef = useRef<HTMLDivElement | null>(null)
  const cityBoxRef = useRef<HTMLDivElement | null>(null)

  // const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL;

  // 반려동물 종류 대분류 선택
  const handlePetTypeChange = (typeCode: string) => {
    setSelectedPetType(typeCode)
    setSelectedPetDetails([]) // 대분류 변경시 세부 선택 초기화
  }

  // 반려동물 종류 소분류 선택
  const handlePetDetailToggle = (detailCode: string) => {
    setSelectedPetDetails((prev) => (prev.includes(detailCode) ? prev.filter((code) => code !== detailCode) : [...prev, detailCode]))
  }

  // 상품 카테고리 선택
  const handleCategoryToggle = (categoryCode: string) => {
    setSelectedCategories((prev) => (prev.includes(categoryCode) ? prev.filter((code) => code !== categoryCode) : [...prev, categoryCode]))
  }

  // 상품 상태 선택
  const handleConditionToggle = (condition: string) => {
    setSelectedConditions((prev) =>
      prev.includes(condition) ? prev.filter((selectedCondition) => selectedCondition !== condition) : [...prev, condition]
    )
  }

  // 가격대 선택
  const handlePriceRangeToggle = (range: string) => {
    setSelectedPriceRanges((prev) => (prev.includes(range) ? prev.filter((selectedPriceRange) => selectedPriceRange !== range) : [...prev, range]))
  }

  const handleStateSelect = (stateCode: string) => {
    setSelectedState(stateCode)
    setSelectedCity('')
    setShowStateDropdown(false)
  }

  const handleCitySelect = (cityCode: string) => {
    setSelectedCity(cityCode)
    setShowCityDropdown(false)
  }

  // 사용하지 않는 함수들 - 추후 구현 예정
  // TODO: 필터 기능 구현 시 사용
  void handleCategoryToggle
  void handleConditionToggle
  void handlePriceRangeToggle
  void handleStateSelect
  void handleCitySelect

  // 필터 초기화
  const resetFilters = () => {
    setSelectedPetType('ALL')
    setSelectedPetDetails([])
    setSelectedCategories([])
    setSelectedConditions([])
    setSelectedPriceRanges([])
    setSelectedState(null)
    setSelectedCity(null)
  }

  const loadFilterData = async () => {
    try {
      setLoading(true)
      const data = await fetchAllCategory()
      console.log(data)
      setFilterData(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : '오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadFilterData()
  }, [])

  useEffect(() => {
    onFilterChange({
      selectedPetType: selectedPetType === 'ALL' ? null : selectedPetType,
      selectedPetDetails,
      selectedCategories,
      selectedConditions,
      selectedPriceRanges,
      selectedLocation: { state: selectedState, city: selectedCity },
    })
  }, [selectedPetType, selectedPetDetails, selectedCategories, selectedConditions, selectedPriceRanges, selectedState, selectedCity])

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      const target = e.target as Node

      // 시/도 드롭다운 바깥 클릭
      if (showStateDropdown && stateBoxRef.current && !stateBoxRef.current.contains(target)) {
        setShowStateDropdown(false)
      }
      // 구/군 드롭다운 바깥 클릭
      if (showCityDropdown && cityBoxRef.current && !cityBoxRef.current.contains(target)) {
        setShowCityDropdown(false)
      }
    }

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showStateDropdown) setShowStateDropdown(false)
        if (showCityDropdown) setShowCityDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleOutside)
    document.addEventListener('keydown', handleEsc)
    return () => {
      document.removeEventListener('mousedown', handleOutside)
      document.removeEventListener('keydown', handleEsc)
    }
  }, [showStateDropdown, showCityDropdown])

  if (loading) {
    return (
      <div className="px-lg py-xl mx-auto max-w-[var(--container-max-width)]">
        <div className="text-text-secondary text-center">필터 데이터를 불러오는 중...</div>
      </div>
    )
  }

  // 에러가 있을 때
  if (error) {
    return (
      <div className="px-lg py-xl mx-auto max-w-[var(--container-max-width)]">
        <div className="text-center text-red-500">
          <p>에러: {error}</p>
          <button onClick={loadFilterData} className="bg-primary mt-4 rounded-md px-4 py-2 text-white">
            다시 시도
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="py-xl gap-xl mx-auto flex max-w-[var(--container-max-width)] flex-col">
      {/* 반려동물 종류 */}
      <div className="gap-sm flex flex-col">
        <div className="flex items-center justify-between">
          <h3 id="pet-type-heading" className="heading5 text-text-primary font-extrabold">
            반려동물 종류
          </h3>
          <button
            className="cursor-pointer rounded-xl bg-black/50 px-2 py-1 text-sm font-bold text-white shadow-md hover:shadow-md"
            type="button"
            onClick={resetFilters}
          >
            필터 초기화
          </button>
        </div>

        {/* 상위 분류 탭 */}
        <div
          role="tablist"
          aria-label="반려동물 상위 분류"
          className="tablet:grid-cols-3 desktop:grid-cols-6 gap-sm px-sm py-sm bg-dark/25 grid grid-cols-2 rounded-3xl"
        >
          <button
            key="ALL"
            role="tab"
            type="button"
            aria-selected={selectedPetType === 'ALL'}
            onClick={() => handlePetTypeChange('ALL')}
            className={`px-md py-sm w-full rounded-3xl ${
              selectedPetType === 'ALL' ? 'bg-dark font-extrabold text-white' : 'hover:bg-light hover:shadow-sm'
            } text-text-primary cursor-pointer text-center hover:shadow-sm`}
          >
            전체
          </button>

          {filterData?.petTypes.map((petType) => (
            <button
              key={petType.code}
              role="tab"
              type="button"
              aria-selected={selectedPetType === petType.code}
              onClick={() => handlePetTypeChange(petType.code)}
              className={`px-md py-sm w-full rounded-3xl ${
                selectedPetType === petType.code ? 'bg-dark hover:bg-secondary hover:text-text-primary font-extrabold text-white' : 'font-bold'
              } text-text-primary hover:bg-light cursor-pointer text-center transition-colors duration-300 ease-in-out hover:shadow-sm`}
            >
              {petType.name}
            </button>
          ))}
        </div>
      </div>
      {/* 하위 분류(개체) */}
      <div>
        {selectedPetType === 'ALL' ? (
          // 전체 선택시 모든 세부 항목 표시
          <div aria-labelledby="pet-sub-all">
            <div className="gap-sm flex flex-wrap" role="tabpanel">
              {filterData?.petTypes.flatMap((type) =>
                type.details.map((detail) => (
                  <button
                    key={detail.code}
                    type="button"
                    onClick={() => handlePetDetailToggle(detail.code)}
                    className={`px-md py-xs flex items-center rounded-md ${
                      selectedPetDetails.includes(detail.code)
                        ? 'bg-dark hover:bg-secondary hover:text-text-primary font-extrabold text-white'
                        : 'bg-secondary/40 font-bold'
                    } bodySmall text-text-primary hover:bg-secondary cursor-pointer shadow-sm hover:shadow-md`}
                  >
                    <span>{detail.name}</span>
                  </button>
                ))
              )}
            </div>
          </div>
        ) : (
          // 특정 대분류 선택시 해당 세부 항목만 표시
          filterData?.petTypes
            .filter((type) => type.code === selectedPetType)
            .map((petType) => (
              <div key={petType.code} aria-labelledby={`pet-sub-${petType.code}`}>
                <div className="gap-sm flex flex-wrap" role="tabpanel">
                  {petType.details.map((detail) => (
                    <button
                      key={detail.code}
                      type="button"
                      onClick={() => handlePetDetailToggle(detail.code)}
                      className={`px-md py-xs flex items-center rounded-md ${
                        selectedPetDetails.includes(detail.code)
                          ? 'bg-dark hover:bg-secondary hover:text-text-primary font-extrabold text-white'
                          : 'bg-secondary/40 font-bold'
                      } bodySmall text-text-primary hover:bg-secondary cursor-pointer shadow-sm hover:shadow-md`}
                    >
                      <span>{detail.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))
        )}
      </div>

      {/* 상품 카테고리 */}
      {/* <div>
        <h3 id="category-heading" className="mb-md tablet:mb-lg heading5 text-text-primary font-extrabold">
          상품 카테고리
        </h3>
        <nav aria-label="상품 카테고리 목록">
          <ul className="gap-sm flex flex-wrap">
            {filterData?.categories.map((category) => (
              <li key={category.code}>
                <button
                  type="button"
                  onClick={() => handleCategoryToggle(category.code)}
                  className={`px-md py-xs flex items-center rounded-md ${
                    selectedCategories.includes(category.code)
                      ? 'bg-dark hover:bg-secondary hover:text-text-primary font-extrabold text-white'
                      : 'bg-secondary/40 font-bold'
                  } bodySmall text-text-primary hover:bg-secondary cursor-pointer shadow-sm hover:shadow-md`}
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div> */}

      {/* 세부 필터 */}
      {/* <div className="gap-sm flex flex-col">
        <button
          type="button"
          className="px-lg py-sm bg-secondary/40 text-text-primary h-10 w-full items-center justify-between rounded-md transition-all"
        >
          <div className="items-center8 gap-sm flex">
            <FiFilter />
            <span className="bodyRegular">세부 필터</span>
            <span className="text-md px-sm gap-sm bg-secondary border-border caption text-text-primary items-center justify-center overflow-hidden rounded-md border py-[2px] font-bold whitespace-nowrap">
              상품상태 · 가격대 · 지역
            </span>
          </div>
        </button>

        <div className="bg-secondary/40 px-lg py-md rounded-md">
          <div className="desktop:grid-cols-3 gap-lg grid grid-cols-1 rounded-lg">
            <div className="gap-sm flex flex-col">
              <h3 className="font-md text-text-primary">상품 상태</h3>
              <div className="gap-sm flex flex-wrap">
                {CONDITION_ITEMS.map((item) => (
                  <button
                    key={item.value}
                    onClick={() => handleConditionToggle(item.value)}
                    className={`px-md py-sm rounded-md ${
                      selectedConditions.includes(item.value)
                        ? 'bg-primary border-primary font-extrabold text-white'
                        : 'bg-light border-border cursor-pointer font-bold'
                    } bodySmall shadow-sm transition-all hover:shadow-md`}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="gap-sm flex flex-col">
              <h3 className="text-text-primary font-medium">가격대</h3>
              <div className="gap-sm flex flex-wrap">
                {priceItems.map((item) => (
                  <button
                    key={item.value}
                    onClick={() => handlePriceRangeToggle(item.value)}
                    className={`px-md py-sm rounded-md ${
                      selectedPriceRanges.includes(item.value)
                        ? 'bg-primary border-primary font-extrabold text-white'
                        : 'border-border bg-light font-bold'
                    } bodySmall text-text-primary cursor-pointer shadow-sm hover:shadow-md`}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            </div>

        <div className="flex flex-col gap-sm">
              <h3 className="font-medium text-text-primary">지역</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="relative" ref={stateBoxRef}>
                  <button
                    type="button"
                    role="combobox"
                    aria-expanded={showStateDropdown}
                    onClick={() => {
                      setShowStateDropdown(prev => !prev);
                      setShowCityDropdown(false);
                    }}
                    className={`flex w-full rounded-md py-2 pl-3 text-sm bg-light cursor-pointer shadow-sm hover:shadow-md font-bold text-text-primary`}
                  >
                    <span>
                      {selectedState
                        ? LOCATIONS.find(location => location.code === selectedState)?.name
                        : '시/도를 선택해주세요'}
                    </span>
                  </button>
                  {showStateDropdown && (
                    <div
                      role="listbox"
                      aria-label="시/도 선택"
                      className="absolute left-0 top-full z-2 w-full rounded-md border border-border bg-white p-1 shadow-md mt-sm"
                    >
                      {LOCATIONS.map(location => (
                        <button
                          key={location.code}
                          role="option"
                          aria-selected={selectedState === location.code}
                          type="button"
                          onClick={() => handleStateSelect(location.code)}
                          className={`w-full px-3 py-xs rounded-md transition
                          hover:bg-gray-100 focus:bg-gray-100 focus:outline-none text-left bodySmall
                          ${
                            selectedState === location.code
                              ? 'bg-gray-100 ring-1 ring-gray-300'
                              : ''
                          } cursor-pointer`}
                        >
                          {location.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="relative" ref={cityBoxRef}>
                  <button
                    type="button"
                    role="combobox"
                    aria-expanded={showCityDropdown}
                    onClick={() => {
                      if (!selectedState) return;
                      setShowCityDropdown(prev => !prev);
                      setShowStateDropdown(false);
                    }}
                    className={`flex w-full rounded-md py-2 pl-3 text-sm bg-light cursor-pointer shadow-sm hover:shadow-md font-bold text-text-primary `}
                  >
                    <span>
                      {selectedCity
                        ? cityOptions.find(city => city.code === selectedCity)?.name
                        : selectedState
                        ? '구/군을 선택해주세요'
                        : '먼저 시/도를 선택해주세요'}
                    </span>
                  </button>
                  {showCityDropdown && selectedState && (
                    <div
                      role="listbox"
                      aria-label="구/군 선택"
                      className="absolute left-0 top-full z-2 w-full rounded-md border border-border bg-white p-1 shadow-md mt-sm"
                    >
                      {cityOptions.map(city => (
                        <button
                          key={city.code}
                          role="option"
                          aria-selected={selectedCity === city.code}
                          type="button"
                          onClick={() => handleCitySelect(city.code)}
                          className={`w-full px-3 py-xs rounded-md transition
                            hover:bg-gray-100 focus:bg-gray-100 focus:outline-none text-left bodySmall cursor-pointer
                            ${
                              selectedCity === city.code ? 'bg-gray-100 ring-1 ring-gray-300' : ''
                            }`}
                        >
                          {city.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div> 
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default CategoryFilter
