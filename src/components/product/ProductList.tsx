import ProductCard from '@src/components/product/ProductCard'
import { ROUTES } from '@src/constants/routes'
import { useLoginModalStore } from '@src/store/modalStore'
import { useUserStore } from '@src/store/userStore'
import type { Product } from '@src/types'
import { Link, useNavigate } from 'react-router-dom'
import { cn } from '@src/utils/cn'

interface ProductListProps {
  products: Product[]
  showMoreButton?: boolean
  sellerId?: number
}

export default function ProductList({ products, showMoreButton = false, sellerId }: ProductListProps) {
  const { isLogin, setRedirectUrl } = useUserStore()
  const { openLoginModal } = useLoginModalStore()
  const navigate = useNavigate()
  const goToUserPage = (sellerId: number) => {
    if (!isLogin()) {
      setRedirectUrl(window.location.pathname)
      openLoginModal()
      return
    }
    navigate(`/user-profile/${sellerId}`)
  }
  return (
    <ul className={cn('grid grid-cols-1 gap-4 md:grid-cols-4', showMoreButton && sellerId && 'items-center')}>
      {products.map((product, index) => (
        <li key={product.id}>
          <ProductCard data-index={index} data={product} />
        </li>
      ))}
      {showMoreButton && sellerId && (
        <button
          type="button"
          onClick={() => goToUserPage(sellerId)}
          className="bg-primary-300 h-fit w-fit cursor-pointer rounded-full px-4 py-5 font-bold text-white"
        >
          더보기
        </button>
      )}
    </ul>
  )
}
