import type { MyPageTabId } from '@src/constants/constants'
import type { BlockedUser, Product } from '@src/types'
import MyPageTitle from './MyPageTitle'
import MyList from './MyList'
import PlaceholderImage from '@assets/images/placeholder.png'
import { Button } from '@src/components/commons/button/Button'
import { EmptyState } from '@src/components/EmptyState'
import { Package, Heart, type LucideIcon } from 'lucide-react'

interface MyPagePanelProps {
  activeTabCode: string
  activeMyPageTab: MyPageTabId
  myProductsData?: { content: Product[]; total: number }
  myRequestData?: { content: Product[]; total: number }
  myFavoriteData?: { content: Product[]; total: number }
  myBlockedData?: { content: BlockedUser[]; total: number }
  handleConfirmModal: (id: number, title: string, price: number, mainImageUrl: string) => void
}

const TAB_CONFIG: {
  [key: string]: {
    heading: string
    description: string
    emptyIcon: LucideIcon
    emptyTitle: string
    emptyDescription?: string
    buttonLabel?: string
    navigateTo?: string
  }
} = {
  'tab-sales': {
    heading: '내가 등록한 상품',
    description: '개의 상품을 등록했습니다',
    emptyIcon: Package,
    emptyTitle: '등록한 상품이 없습니다',
    emptyDescription: '상품을 등록해보세요',
    buttonLabel: '상품등록',
    navigateTo: '/product-post?tab=tab-sales',
  },
  'tab-purchases': {
    heading: '내가 등록한 상품',
    description: '개의 상품을 등록했습니다',
    emptyIcon: Package,
    emptyTitle: '등록한 구매 요청이 없습니다',
    emptyDescription: '구매 요청을 등록해보세요',
    buttonLabel: '판매요청 등록',
    navigateTo: '/product-post?tab=tab-purchases',
  },
  'tab-wishlist': {
    heading: '내가 찜한 상품',
    description: '개의 상품을 찜했습니다',
    emptyIcon: Heart,
    emptyTitle: '찜한 상품이 없습니다',
    emptyDescription: '마음에 드는 상품을 찜해보세요',
  },
}

export default function MyPagePanel({
  activeTabCode,
  activeMyPageTab,
  myProductsData,
  myRequestData,
  myFavoriteData,
  myBlockedData,
  handleConfirmModal,
}: MyPagePanelProps) {
  const getProductData = () => {
    switch (activeMyPageTab) {
      case 'tab-sales':
        return myProductsData
      case 'tab-purchases':
        return myRequestData
      case 'tab-wishlist':
        return myFavoriteData
      default:
        return undefined
    }
  }
  const productData = getProductData()
  const config = activeMyPageTab !== 'tab-blocked' ? TAB_CONFIG[activeMyPageTab] : null

  return (
    <div
      role="tabpanel"
      id={`panel-${activeTabCode}`}
      aria-labelledby={activeMyPageTab}
      className="border-border p-lg flex flex-col gap-6 rounded-xl border"
    >
      {config ? (
        <MyPageTitle
          heading={config.heading}
          count={productData?.total}
          description={config.description}
          buttonLabel={config.buttonLabel}
          navigateTo={config.navigateTo}
        />
      ) : (
        <MyPageTitle heading="차단 유저" description={`차단한 유저 ${myBlockedData?.total ?? 0}명`} />
      )}

      <div className="gap-lg flex flex-col overflow-y-auto">
        {activeMyPageTab !== 'tab-blocked' ? (
          productData?.content?.length ? (
            <ul className="flex max-h-[60vh] flex-col items-center justify-start gap-2.5">
              {productData.content.map((product) => (
                <MyList key={product.id} {...product} activeTab={activeMyPageTab} handleConfirmModal={handleConfirmModal} />
              ))}
            </ul>
          ) : (
            config && <EmptyState icon={config.emptyIcon} title={config.emptyTitle} description={config.emptyDescription} />
          )
        ) : myBlockedData?.content?.length ? (
          <ul className="flex max-h-[60vh] flex-col items-center justify-start gap-2.5">
            {myBlockedData.content.map((user) => (
              <li key={user.blockedUserId} className="flex w-full items-center justify-between gap-6 rounded-lg border border-gray-300 p-3.5">
                <div className="flex items-center gap-4">
                  <div className="aspect-square w-12 shrink-0 overflow-hidden rounded-full">
                    <img src={user.profileImageUrl || PlaceholderImage} alt={user.nickname} className="h-full w-full object-cover" />
                  </div>
                  <span className="font-medium">{user.nickname}</span>
                </div>
                <Button size="sm" className="border border-gray-300">
                  차단 해제
                </Button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  )
}
