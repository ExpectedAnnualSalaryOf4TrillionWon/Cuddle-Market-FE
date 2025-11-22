import CategoryFilter from '@src/components/layouts/CategoryFilter'
import ProductCard from '@src/components/product/ProductCard'
import { useUserStore } from '@store/userStore'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { fetchAllProducts } from '../api/products'
import type { FilterState } from '../types'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

function Home() {
  const { accessToken } = useUserStore()

  const [filters, setFilters] = useState<FilterState>({
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

  // useInfiniteQuery로 무한 스크롤 구현
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } = useInfiniteQuery({
    queryKey: ['products'],
    queryFn: ({ pageParam = 0 }) => {
      console.log('API 호출 - 페이지:', pageParam)
      return fetchAllProducts(pageParam, 20)
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
