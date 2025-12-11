import { useInfiniteQuery } from '@tanstack/react-query'
import { useState, useCallback, useEffect } from 'react'
import { Tabs } from '@src/components/Tabs'
import { DetailFilter } from '@src/pages/home/components/filter/DetailFilter'
import { ProductsSection } from '@src/pages/home/components/product-section/ProductsSection'
import { fetchAllProducts } from '../../api/products'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import {
  PRODUCT_TYPE_TABS,
  PET_TYPE_TABS,
  type ProductTypeTabId,
  type PriceRange,
  type LocationFilter,
  type PetTypeTabId,
  type CategoryFilter as CategoryFilterType,
  SORT_TYPE,
  type SORT_LABELS,
} from '@src/constants/constants'
import { PetTypeFilter } from './components/filter/PetTypeFilter'
import { CategoryFilter } from './components/filter/CategoryFilter'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { Button } from '@src/components/commons/button/Button'
import { useUserStore } from '@src/store/userStore'

function Home() {
  const { isLogin } = useUserStore()
  const isLoggedIn = isLogin()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const keyword = searchParams.get('keyword') || ''
  const sortBy = searchParams.get('sortBy')
  const sortOrder = searchParams.get('sortOrder')
  const [activePetTypeTab, setActivePetTypeTab] = useState<PetTypeTabId>('tab-all')
  const [selectedDetailPet, setSelectedDetailPet] = useState<CategoryFilterType | null>(searchParams.get('petDetailType'))
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilterType | null>(searchParams.get('categories'))
  const [isDetailFilterOpen, setIsDetailFilterOpen] = useState(false)
  const [selectedProductStatus, setSelectedProductStatus] = useState<string | null>(searchParams.get('productStatuses'))
  const [selectedProductPrice, setSelectedProductPrice] = useState<PriceRange | null>(() => {
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    if (!minPrice) return null
    return {
      min: Number(minPrice),
      max: maxPrice ? Number(maxPrice) : null,
    }
  })
  const [selectedLocation, setSelectedLocation] = useState<LocationFilter | null>(null)
  const [activeProductTypeTab, setActiveProductTypeTab] = useState<ProductTypeTabId>('tab-all')
  const [selectedSort, setSelectedSort] = useState<string>(() => {
    const sortItem = SORT_TYPE.find((sort) => {
      if (sortBy === 'price') {
        return sortOrder === 'asc' ? sort.id === 'orderedLowPriced' : sort.id === 'orderedHighPriced'
      }
      return sort.id === sortBy
    })

    return sortItem?.label || '최신순'
  })

  const handleDetailFilterToggle = useCallback((isOpen: boolean) => {
    setIsDetailFilterOpen(isOpen)
  }, [])

  const handleProductStatusChange = useCallback((status: string | null) => {
    setSelectedProductStatus(status)
  }, [])

  const handleMinPriceChange = useCallback((priceRange: PriceRange | null) => {
    setSelectedProductPrice(priceRange)
  }, [])

  const handleLocationChange = useCallback((location: LocationFilter | null) => {
    setSelectedLocation(location)
  }, [])

  const handleCategoryChange = useCallback((category: string | null) => {
    setSelectedCategory(category)
  }, [])

  const handlePetDetailTypeChange = useCallback((pet: string | null) => {
    setSelectedDetailPet(pet)
  }, [])

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
      keyword,
      sortBy,
      sortOrder,
    ],

    // 각 페이지 데이터를 가져오는 함수
    queryFn: ({ pageParam = 0 }) => {
      // 현재 탭에 맞는 productType 파라미터 생성
      const productTypeCode = PRODUCT_TYPE_TABS.find((tab) => tab.id === activeProductTypeTab)?.code
      const petTypeCode = PET_TYPE_TABS.find((tab) => tab.id === activePetTypeTab)?.code

      // 'ALL'은 undefined로 변환 (API에 파라미터 전달하지 않음)
      const productType = productTypeCode === 'ALL' ? undefined : productTypeCode
      const petType = petTypeCode === 'ALL' ? undefined : petTypeCode

      // selectedSort(label)를 id로 변환
      // const sortItem = SORT_TYPE.find((sort) => sort.label === selectedSort)
      // const sortId = sortItem?.id === 'orderedLowPriced' ? 'asc' : sortItem?.id === 'orderedHighPriced' ? 'desc' : 'createdAt'

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
        selectedDetailPet,
        keyword,
        sortBy,
        sortOrder
        // sortId
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

  const filterReset = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      setSearchParams({})
      setActivePetTypeTab('tab-all')
      setSelectedDetailPet(null)
      setSelectedCategory(null)
      setSelectedProductStatus(null)
      setSelectedProductPrice(null)
      setSelectedLocation(null)
      setSelectedSort('최신순')
    },
    [setSearchParams]
  )

  const toGoProductPostPage = (e: React.MouseEvent) => {
    e.preventDefault()
    navigate('/product-post')
  }

  const totalElements = data?.pages?.[0]?.total || 0

  useEffect(() => {
    const hasDetailFilter = searchParams.has('productStatuses') || searchParams.has('minPrice') || searchParams.has('addressSido')

    if (hasDetailFilter) {
      setIsDetailFilterOpen(true)
    }
  }, [searchParams])

  if (isLoading && !data) {
    return (
      <div className="px-lg py-md tablet:py-xl mx-auto max-w-[var(--container-max-width)]">
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600" role="status" aria-label="상품 로딩 중"></div>
        </div>
      </div>
    )
  }

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
    <>
      <div className="bg-bg pb-4xl pt-8">
        <div className="px-lg mx-auto max-w-[var(--container-max-width)]">
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-7">
              <PetTypeFilter
                activeTab={activePetTypeTab}
                onTabChange={setActivePetTypeTab}
                selectedDetailPet={selectedDetailPet}
                onPetDetailTypeChange={handlePetDetailTypeChange}
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
                filterReset={filterReset}
              />
            </div>
            <div className="flex flex-col gap-5">
              <Tabs
                tabs={PRODUCT_TYPE_TABS}
                activeTab={activeProductTypeTab}
                onTabChange={(tabId) => setActiveProductTypeTab(tabId as ProductTypeTabId)}
                ariaLabel="상품 타입 분류"
              />
              <ProductsSection
                products={allProducts}
                totalElements={totalElements}
                activeTab={activeProductTypeTab}
                selectedSort={selectedSort as SORT_LABELS}
                setSelectedSort={setSelectedSort}
                // onSortChange={handleSortChange}
              />
            </div>
          </div>
          {/* 무한 스크롤 감지용 요소 */}
          <div ref={targetRef} className="h-10" aria-hidden="true" />

          {isFetchingNextPage && (
            <div className="flex items-center justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600" aria-label="상품 로딩 중" role="status"></div>
            </div>
          )}
        </div>
      </div>
      {/* <ChatButton /> */}
      {isLoggedIn && (
        <div className="fixed right-10 bottom-5 z-50">
          <Button size="lg" className="bg-primary-300 cursor-pointer text-white" icon={Plus} onClick={toGoProductPostPage}>
            상품등록
          </Button>
        </div>
      )}
    </>
  )
}

export default Home
