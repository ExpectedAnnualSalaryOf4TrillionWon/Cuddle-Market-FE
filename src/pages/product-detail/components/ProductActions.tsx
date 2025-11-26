import { useState } from 'react'
import { Heart } from 'lucide-react'
import { Button } from '@src/components/commons/button/Button'
import { useUserStore } from '@src/store/userStore'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addFavorite } from '@src/api/products'

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
  const queryClient = useQueryClient()
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite)

  const { mutate: toggleFavorite, isPending } = useMutation({
    mutationFn: () => addFavorite(id),
    onSuccess: () => {
      setIsFavorite(!isFavorite)
      // 상품 상세 쿼리 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['product', id] })
    },
  })

  const handleToggleFavorite = () => {
    if (isPending) return
    toggleFavorite()
  }

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
        onClick={handleToggleFavorite}
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
