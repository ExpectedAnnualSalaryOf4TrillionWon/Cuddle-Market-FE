import { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { addFavorite } from '@src/api/products'

interface UseFavoriteOptions {
  productId: number
  initialIsFavorite: boolean
}

export function useFavorite({ productId, initialIsFavorite }: UseFavoriteOptions) {
  // 로컬 state로 즉시 UI 업데이트
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite)

  // props(서버 데이터)가 변경되면 로컬 state도 동기화
  useEffect(() => {
    setIsFavorite(initialIsFavorite)
  }, [initialIsFavorite])

  const { mutate: toggleFavorite, isPending } = useMutation({
    mutationFn: () => addFavorite(productId),
    onMutate: () => {
      // 클릭 즉시 UI 업데이트
      setIsFavorite((prev) => !prev)
    },
    onSuccess: () => {},
    onError: () => {
      // 실패 시 원래 상태로 롤백
      setIsFavorite(initialIsFavorite)
    },
  })

  const handleToggleFavorite = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    if (isPending) return
    toggleFavorite()
  }

  return {
    isFavorite,
    isPending,
    handleToggleFavorite,
  }
}
