import { useInfiniteQuery } from '@tanstack/react-query'
import { useState, useCallback } from 'react'
// import CategoryFilter from '@src/components/layouts/CategoryFilter'
import { ProductTypeTabs } from '@src/pages/home/components/ProductTypeTabs'
import { DetailFilter } from '@src/pages/home/components/DetailFilter'
import { ProductList } from '@src/pages/home/components/ProductList'
import { fetchAllProducts } from '../../api/products'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import type { FilterState } from '../../types'
import { PRODUCT_TYPE_TABS, PET_TYPE_TABS } from '@src/constants/constants'
import type { ProductTypeTabId, PriceRange, LocationFilter, CategoryFilter as CategoryFilterType, PetTypeTabId } from '@src/constants/constants'
import { PetTypeFilter } from './components/PetTypeFilter'
import { CategoryFilter } from './components/CategoryFilter'
// import { useUserStore } from '@store/userStore'

function Home() {
  // const { accessToken } = useUserStore()
  // 현재 선택된 탭 상태 ('tab-all' | 'tab-sales' | 'tab-purchases')
  const [activePetTypeTab, setActivePetTypeTab] = useState<PetTypeTabId>('tab-all')

  const [activeProductTypeTab, setActiveProductTypeTab] = useState<ProductTypeTabId>('tab-all')

  // 상품 상태 필터
  const [selectedProductStatus, setSelectedProductStatus] = useState<string | null>(null)

  // 가격 필터
  const [selectedProductPrice, setSelectedProductPrice] = useState<PriceRange | null>(null)

  // 지역 필터
  const [selectedLocation, setSelectedLocation] = useState<LocationFilter | null>(null)

  // 카테고리 필터
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilterType | null>(null)

  // 반려동물 세부종류 필터
  const [selectedDetailPet, setSelectedDetailPet] = useState<CategoryFilterType | null>(null)

  // 세부 필터 열림/닫힘 상태
  const [isDetailFilterOpen, setIsDetailFilterOpen] = useState(false)

  // 세부 필터 토글 함수 메모이제이션
  const handleDetailFilterToggle = useCallback((isOpen: boolean) => {
    setIsDetailFilterOpen(isOpen)
  }, [])

  // 상품 상태 변경 함수 메모이제이션
  const handleProductStatusChange = useCallback((status: string | null) => {
    setSelectedProductStatus(status)
  }, [])

  // 가격 범위 변경 함수 메모이제이션
  const handleMinPriceChange = useCallback((priceRange: PriceRange | null) => {
    setSelectedProductPrice(priceRange)
  }, [])

  // 지역 변경 함수 메모이제이션
  const handleLocationChange = useCallback((location: LocationFilter | null) => {
    setSelectedLocation(location)
  }, [])

  // 카테고리 변경 함수 메모이제이션
  const handleCategoryChange = useCallback((category: string | null) => {
    setSelectedCategory(category)
  }, [])

  // 반려동물 세부종류 변경 함수 메모이제이션
  const handlePetDetailTypeChange = useCallback((pet: string | null) => {
    setSelectedDetailPet(pet)
  }, [])

  // const [_filters, setFilters] = useState<FilterState>({
  //   selectedPetType: null,
  //   selectedPetDetails: [],
  //   selectedCategories: [],
  //   selectedConditions: [],
  //   selectedPriceRanges: [],
  //   selectedLocation: {
  //     state: null,
  //     city: null,
  //   },
  // })

  /**
   * 무한 스크롤을 위한 React Query 설정
   * - queryKey: ['products', activeTab, selectedProductStatus] - 필터 변경 시 새로운 쿼리로 인식하여 데이터 refetch
   * - queryFn: 각 페이지를 가져오는 함수 (pageParam은 페이지 번호)
   * - getNextPageParam: 다음 페이지 번호를 결정하는 함수 (undefined 반환 시 더 이상 페이지 없음)
   * - initialPageParam: 첫 페이지 번호 (0부터 시작)
   */
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } = useInfiniteQuery({
    // queryKey에 activeTab과 selectedProductStatus 포함: 필터 변경 시 캐시를 분리
    queryKey: [
      'products',
      activeProductTypeTab,
      selectedDetailPet,
      selectedProductStatus,
      selectedProductPrice,
      selectedLocation,
      selectedCategory,
      activePetTypeTab,
    ],

    // 각 페이지 데이터를 가져오는 함수
    queryFn: ({ pageParam = 0 }) => {
      // 현재 탭에 맞는 productType 파라미터 생성
      const productTypeCode = PRODUCT_TYPE_TABS.find((tab) => tab.id === activeProductTypeTab)?.code
      const petTypeCode = PET_TYPE_TABS.find((tab) => tab.id === activePetTypeTab)?.code

      // 'ALL'은 undefined로 변환 (API에 파라미터 전달하지 않음)
      const productType = productTypeCode === 'ALL' ? undefined : productTypeCode
      const petType = petTypeCode === 'ALL' ? undefined : petTypeCode

      // API 호출: 페이지 번호, 페이지 크기(20), productType 필터, productStatus 필터, 가격 필터, 지역 필터
      return fetchAllProducts(
        pageParam,
        20,
        productType,
        selectedProductStatus,
        selectedProductPrice?.min ?? null,
        selectedProductPrice?.max ?? null,
        selectedLocation?.sido ?? null,
        selectedLocation?.gugun ?? null,
        selectedCategory,
        petType,
        selectedDetailPet
      )
    },

    // 다음 페이지 번호를 결정하는 함수 (무한 스크롤 핵심 로직)
    getNextPageParam: (lastPage) => {
      // API 응답에서 페이지 정보 추출
      const currentPage = lastPage.data.data.page // 현재 페이지 번호 (0-based)
      const totalPages = lastPage.data.data.totalPages // 전체 페이지 수
      const hasNext = lastPage.data.data.hasNext // 다음 페이지 존재 여부

      // hasNext와 totalPages 둘 다 확인하여 다음 페이지 존재 여부 판단
      if (hasNext && currentPage + 1 < totalPages) {
        // 다음 페이지 번호 반환 (이 값이 다음 queryFn의 pageParam으로 전달됨)
        return currentPage + 1
      }

      // undefined 반환 시 hasNextPage가 false가 되어 무한 스크롤 종료
      return undefined
    },

    // 첫 번째 페이지 번호 (0부터 시작)
    initialPageParam: 0,

    // 새로운 데이터를 가져오는 동안 이전 데이터 유지
    placeholderData: (previousData) => previousData,
  })

  // 모든 페이지의 상품을 하나의 배열로 합치기
  const allProducts = []
  if (data?.pages) {
    for (const page of data.pages) {
      allProducts.push(...page.data.data.content)
    }
  }

  // 무한 스크롤 감지
  const targetRef = useIntersectionObserver({
    enabled: allProducts.length > 0,
    hasNextPage,
    isFetchingNextPage,
    onIntersect: fetchNextPage,
    threshold: 0.5,
  })

  // 전체 상품 개수 (API에서 제공)
  const totalElements = data?.pages?.[0]?.total || 0

  // 로딩 상태
  if (isLoading && !data) {
    return (
      <div className="px-lg py-md tablet:py-xl mx-auto max-w-[var(--container-max-width)]">
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600" role="status" aria-label="상품 로딩 중"></div>
        </div>
      </div>
    )
  }

  // 에러 상태
  if (error) {
    return (
      <div className="px-lg py-md tablet:py-xl mx-auto max-w-[var(--container-max-width)]">
        <div className="rounded-md border border-red-200 bg-red-50 p-4" role="alert">
          <p className="text-red-600">{error.message}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-bg pb-4xl">
      <div className="px-lg py-md tablet:py-xl mx-auto max-w-[var(--container-max-width)]">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-7">
            <PetTypeFilter
              activeTab={activePetTypeTab}
              onTabChange={setActivePetTypeTab}
              selectedDetailPet={selectedDetailPet}
              onCategoryChange={handlePetDetailTypeChange}
            />
            <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
            <DetailFilter
              isOpen={isDetailFilterOpen}
              onToggle={handleDetailFilterToggle}
              selectedProductStatus={selectedProductStatus}
              onProductStatusChange={handleProductStatusChange}
              selectedPriceRange={selectedProductPrice}
              onMinPriceChange={handleMinPriceChange}
              onLocationChange={handleLocationChange}
            />
          </div>
          <ProductTypeTabs activeTab={activeProductTypeTab} onTabChange={setActiveProductTypeTab} />
        </div>
        <ProductList products={allProducts} totalElements={totalElements} activeTab={activeProductTypeTab} />
        {/* 무한 스크롤 감지용 요소 */}
        <div ref={targetRef} className="h-10" aria-hidden="true" />

        {isFetchingNextPage && (
          <div className="flex items-center justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600" aria-label="상품 로딩 중" role="status"></div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
