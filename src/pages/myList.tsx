// TODO: 타입 에러 수정 필요 - 임시로 비활성화
type TabId = 'products' | 'wishlist'

interface MyListProps {
  activeTab: TabId
  onCountsUpdate?: (counts: { products: number; wishlist: number }) => void
  onProductDelete: (itemId?: number) => void
  onLikeDelete: (itemId?: number) => Promise<boolean>
}

export default function MyList({ activeTab }: MyListProps) {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <p className="text-xl text-gray-500">
        {activeTab === 'products' ? '내 상품' : '찜한 상품'} 목록 (개발 중)
      </p>
    </div>
  )
}
