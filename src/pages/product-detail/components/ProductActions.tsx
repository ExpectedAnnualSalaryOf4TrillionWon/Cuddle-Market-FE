import { Heart } from 'lucide-react'
import { Button } from '@src/components/commons/button/Button'
import { useUserStore } from '@src/store/userStore'
import { useNavigate } from 'react-router-dom'
import { useFavorite } from '@src/hooks/useFavorite'

interface ProductActionsProps {
  isFavorite: boolean
  id: number
  sellerInfo: {
    sellerId: number
    sellerNickname: string
    sellerProfileImageUrl: string
  }
}
export default function ProductActions({ id, isFavorite: initialIsFavorite, sellerInfo }: ProductActionsProps) {
  const { user } = useUserStore()
  const navigate = useNavigate()

  const { isFavorite, handleToggleFavorite } = useFavorite({
    productId: id,
    initialIsFavorite,
  })

  const isMyProduct = user?.id === sellerInfo?.sellerId

  const handleEdit = (productId: number) => {
    navigate(`/products/${productId}/edit`)
  }

  const handleChat = () => {
    console.log('채팅')
  }

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
        onClick={handleToggleFavorite}
      />
      <Button size="md" className="bg-primary-400 flex-1 cursor-pointer text-white" onClick={isMyProduct ? () => handleEdit(id) : handleChat}>
        {isMyProduct ? '수정하기' : '채팅하기'}
      </Button>
    </div>
  )
}
