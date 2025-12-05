import ProfileData from './my-page/components/ProfileData'
import { useState } from 'react'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { fetchUserData, fetchUserProductData } from '@src/api/profile'
import { ProductListItem } from '@src/components/product/ProductListItem'
import { LoadMoreButton } from '@src/components/commons/button/LoadMoreButton'
import { EmptyState } from '@src/components/EmptyState'
import { Package } from 'lucide-react'

function UserPage() {
  const [, setIsWithdrawModalOpen] = useState(false)
  const { id } = useParams()
  const { data: userData, isLoading: isLoadingUserData } = useQuery({
    queryKey: ['userPage'],
    queryFn: () => fetchUserData(Number(id)),
    enabled: !!id,
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

  if (isLoadingUserData || isLoadingUserProductData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    )
  }
  if (!userData || !userProductData) return

  return (
    <div className="tablet:flex-row gap-xl px-lg py-xl mx-auto flex max-w-[var(--container-max-width)] flex-col">
      <ProfileData setIsWithdrawModalOpen={setIsWithdrawModalOpen} data={userData!} />
      <section className="border-border flex w-full flex-col gap-6 rounded-xl border p-5">
        <div className="flex justify-between">
          <h4 className="flex items-center gap-2">{userData?.nickname}님의 판메상품 (6)</h4>
          {/* {userData?.products.length !== 0 && <p>{count !== undefined ? `총 ${count}${description}` : description}</p>} */}
        </div>
        <div className="gap-lg flex max-h-[60vh] flex-col overflow-y-auto">
          {userProductData?.pages?.flatMap((page) => page.content).length ? (
            <>
              <ul className="flex flex-col items-center justify-start gap-2.5">
                {userProductData.pages
                  .flatMap((page) => page.content)
                  .map((product) => (
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
      {/* 우측: 탭 + 목록 */}
      {/* <div className="tablet:col-span-2 flex-1">
          <div className="gap-sm flex w-full flex-col">
            <div role="tablist" aria-label="사용자 탭" className="mb-lg px-sm py-sm border-b border-gray-200">
              <h3 className="heading4 text-text-primary font-bold"></h3>
            </div>

            <div role="tabpanel" id="panel-products" aria-labelledby="tab-products" className={`flex-1 outline-none`}>
              <div className="gap-md flex flex-col">
              {seller.seller_products.map(item => (
                  <div
                    key={item.product_id}
                    className="
                    cursor-pointer
                    rounded-lg p-lg
                    border border-border
                    bg-bg
                    transition-shadow hover:shadow-sm"
                    onClick={goToProductDetail}
                  >
                    <div className="flex gap-lg ">
                      <div className="w-[113px] h-full rounded-lg overflow-hidden">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="block w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 flex flex-col gap-1">
                        <h3 className="bodyRegular text-text-primary font-bold">{item.title}</h3>
                        <p className="heading5 text-dark font-bold">
                          {item.price.toLocaleString()}원
                        </p>

                        <div className="flex items-center gap-xs bodySmall text-text-secondary">
                          <GrView />
                          <span>조회 {item.view_count}</span>
                        </div>
                      </div>

                      <span
                        className="
                        flex items-center justify-center gap-1
                          rounded-md px-3 py-2 
                          border border-sale
                          bg-sale text-bg
                          text-sm font-medium whitespace-nowrap
                          transition-[color,box-shadow] overflow-hidden h-max
                        "
                      >
                        {item.transaction_status}
                      </span>
                    </div>
                  </div>
                ))} 
              </div>
            </div>
          </div>
        </div> */}
    </div>
  )
}

export default UserPage
