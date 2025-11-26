import { Heart } from 'lucide-react'
import { Button } from '@src/components/commons/button/Button'
import { useUserStore } from '@src/store/userStore'

interface ProductActionsProps {
  isFavorite: boolean
  sellerInfo: {
    sellerId: number
    sellerNickname: string
    sellerProfileImageUrl: string
  }
}
export default function ProductActions({ isFavorite, sellerInfo }: ProductActionsProps) {
  const { user } = useUserStore()
  const isMyProduct = user?.id === sellerInfo?.sellerId
  return (
    <div className="gap-sm flex">
      <Button
        icon={Heart}
        iconProps={{
          color: isFavorite ? '#fc8181' : undefined,
          fill: isFavorite ? '#fc8181' : 'none',
        }}
        size="md"
        className="cursor-pointer border border-gray-300 bg-white"
        // onClick={handleToggleFavorite}
      />
      <Button
        size="md"
        className="bg-primary-400 flex-1 cursor-pointer text-white"
        // onClick={isMyProduct ? handleEdit : handleChat}
      >
        {isMyProduct ? '수정하기' : '채팅하기'}
      </Button>
    </div>
  )
}
