import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { addFavorite } from '@src/api/products'
import { useUserStore } from '@src/store/userStore'
import { useLoginModalStore } from '@src/store/modalStore'

interface UseFavoriteOptions {
  productId: number
  initialIsFavorite: boolean
}

export function useFavorite({ productId, initialIsFavorite }: UseFavoriteOptions) {
  const { isLogin } = useUserStore()
  const { openLoginModal } = useLoginModalStore()
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite)

  const { mutate: toggleFavorite, isPending } = useMutation({
    mutationFn: () => addFavorite(productId),
    onSuccess: () => {},
    onError: () => {
      setIsFavorite(initialIsFavorite)
    },
  })

  const handleToggleFavorite = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    if (isPending) return

    // 미로그인 시 로그인 모달 열기
    if (!isLogin()) {
      openLoginModal()
      return
    }

    toggleFavorite()
  }

  return {
    isFavorite,
    isPending,
    handleToggleFavorite,
  }
}
