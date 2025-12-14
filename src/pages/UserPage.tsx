import ProfileData from '@src/components/profile/ProfileData'
import { useState } from 'react'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { fetchUserData, fetchUserProductData } from '@src/api/profile'
import { ProductListItem } from '@src/components/product/ProductListItem'
import { LoadMoreButton } from '@src/components/commons/button/LoadMoreButton'
import { EmptyState } from '@src/components/EmptyState'
import { Package } from 'lucide-react'
import UserReportModal from '@src/components/modal/UserReportModal'
import BlockModal from '@src/components/modal/BlockModal'

function UserPage() {
  const [, setIsWithdrawModalOpen] = useState(false)
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false)
  const { id } = useParams()
  const { data: userData, isLoading: isLoadingUserData } = useQuery({
    queryKey: ['userPage'],
    queryFn: () => fetchUserData(Number(id)),
    enabled: !!id,
    refetchOnWindowFocus: false,
  })

  const {
    data: userProductData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingUserProductData,
  } = useInfiniteQuery({
    queryKey: ['userProducts', id],
    queryFn: ({ pageParam }) => fetchUserProductData(id!, pageParam),
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.page + 1 : undefined),
    initialPageParam: 0,
    enabled: !!id,
  })

  const totalProducts = userProductData?.pages[0]?.total ?? 0
  const allProducts = userProductData?.pages.flatMap((page) => page.content) ?? []

  if (isLoadingUserData || isLoadingUserProductData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!userData || !userProductData) return

  return (
    <>
      <div className="bg-bg pb-4xl pt-8">
        <div className="px-lg mx-auto flex max-w-[var(--container-max-width)] gap-8">
          <ProfileData
            setIsWithdrawModalOpen={setIsWithdrawModalOpen}
            setIsReportModalOpen={setIsReportModalOpen}
            setIsBlockModalOpen={setIsBlockModalOpen}
            data={userData!}
          />
          <section className="border-border flex w-full flex-col gap-6 rounded-xl border p-5">
            <div className="flex justify-between">
              <h4 className="flex items-center gap-2">
                {userData?.nickname}님의 판매상품 {totalProducts}
              </h4>
            </div>
            <div className="gap-lg flex max-h-[60vh] flex-col overflow-y-auto">
              {userProductData?.pages?.flatMap((page) => page.content).length ? (
                <>
                  <ul className="flex flex-col items-center justify-start gap-2.5">
                    {allProducts.map((product) => (
                      <ProductListItem key={product.id} product={product} />
                    ))}
                  </ul>
                  {hasNextPage && <LoadMoreButton onClick={() => fetchNextPage()} isLoading={isFetchingNextPage} />}
                </>
              ) : (
                <EmptyState icon={Package} title={'등록한 상품이 없습니다'} />
              )}
            </div>
          </section>
        </div>
      </div>
      <UserReportModal
        isOpen={isReportModalOpen}
        onCancel={() => setIsReportModalOpen(false)}
        userNickname={userData.nickname}
        userId={Number(id)}
      />
      <BlockModal isOpen={isBlockModalOpen} onCancel={() => setIsBlockModalOpen(false)} userNickname={userData.nickname} userId={Number(id)} />
    </>
  )
}

export default UserPage
