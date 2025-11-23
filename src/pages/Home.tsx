import CategoryFilter from '@src/components/layouts/CategoryFilter'
import ProductCard from '@src/components/product/ProductCard'
// import { useUserStore } from '@store/userStore'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { fetchAllProducts } from '../api/products'
import type { FilterState } from '../types'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { Button } from '@src/components/commons/button/Button'
import { PRODUCT_TYPE_TABS, type ProductTypeTabId } from '@src/constants/constants'

function Home() {
  // const { accessToken } = useUserStore()
  const [activeTab, setActiveTab] = useState<ProductTypeTabId>('tab-all')

  const [_filters, setFilters] = useState<FilterState>({
    selectedPetType: null,
    selectedPetDetails: [],
    selectedCategories: [],
    selectedConditions: [],
    selectedPriceRanges: [],
    selectedLocation: {
      state: null,
      city: null,
    },
  })

  // activeTab에 따른 productType 매핑
  const getProductType = (tab: ProductTypeTabId): string | undefined => {
    switch (tab) {
      case 'tab-all':
        return undefined // 전체는 productType 없음
      case 'tab-sales':
        return 'SELL'
      case 'tab-purchases':
        return 'REQUEST'
      default:
        return undefined
    }
  }

  // useInfiniteQuery로 무한 스크롤 구현
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } = useInfiniteQuery({
    queryKey: ['products', activeTab], // activeTab을 queryKey에 추가
    queryFn: ({ pageParam = 0 }) => {
      const productType = getProductType(activeTab)
      console.log('API 호출 - 페이지:', pageParam, 'productType:', productType)
      return fetchAllProducts(pageParam, 20, productType)
    },
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.data.data.page
      const totalPages = lastPage.data.data.totalPages
      const hasNext = lastPage.data.data.hasNext

      console.log(`페이지 정보: ${currentPage + 1}/${totalPages}, hasNext: ${hasNext}`)

      // 현재 페이지가 마지막 페이지보다 작으면 다음 페이지 반환
      // hasNext 조건 제거 (백엔드 버그 때문에)
      if (currentPage + 1 < totalPages) {
        console.log(`다음 페이지 요청: ${currentPage + 1}`)
        return currentPage + 1
      }

      console.log('마지막 페이지 도달')
      return undefined
    },
    initialPageParam: 0,
  })

  // 모든 페이지의 상품을 하나의 배열로 합치기
  const allProducts = []
  if (data?.pages) {
    console.log(data)

    for (const page of data.pages) {
      allProducts.push(...page.data.data.content)
    }
  }

  // 판매상품을 하나의 배열로 합치기

  // 전체 상품 개수 (API에서 제공)
  const totalElements = data?.pages?.[0]?.total || 0

  // 무한 스크롤 감지
  const targetRef = useIntersectionObserver({
    enabled: allProducts.length > 0,
    hasNextPage,
    isFetchingNextPage,
    onIntersect: fetchNextPage,
    threshold: 0.5,
  })

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="px-lg py-md tablet:py-xl mx-auto max-w-[var(--container-max-width)]">
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  // 에러 상태
  if (error) {
    return (
      <div className="px-lg py-md tablet:py-xl mx-auto max-w-[var(--container-max-width)]">
        <div className="rounded-md border border-red-200 bg-red-50 p-4">
          <p className="text-red-600">{error.message}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-bg pb-4xl">
      <div className="px-lg py-md tablet:py-xl mx-auto max-w-[var(--container-max-width)]">
        <CategoryFilter onFilterChange={setFilters} />

        <div role="tablist" aria-label="상품 타입 분류" className="border-b-primary-200 flex gap-2.5 border-b-2 pb-1">
          {PRODUCT_TYPE_TABS.map((tab) => (
            <Button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              size="md"
              className={`flex-1 cursor-pointer rounded-2xl text-base ${activeTab === tab.id ? 'bg-primary-300 font-bold text-white' : 'hover:bg-primary-100 text-gray-900'}`}
            >
              {tab.label}
            </Button>
          ))}
        </div>
        <div className="pt-3xl pb-lg">
          <h2 className="heading4 text-text-primary">전체 상품</h2>
          <p className="mt-xs bodySmall text-text-secondary">{`총 ${totalElements}개의 상품`}</p>
        </div>

        <ul className="grid grid-cols-4 gap-4">
          {allProducts.map((product, index) => (
            <ProductCard key={product.id} data-index={index} data={product} />
          ))}
        </ul>

        {/* 무한 스크롤 감지용 요소 */}
        <div ref={targetRef} className="h-10" />

        {/* 로딩 중 표시 */}
        {isFetchingNextPage && (
          <div className="flex items-center justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
