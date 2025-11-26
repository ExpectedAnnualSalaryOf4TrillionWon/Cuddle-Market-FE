import { Button } from '@src/components/commons/button/Button'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '@src/store/userStore'

interface SellerProfileCardProps {
  sellerInfo: {
    sellerId: number
    sellerNickname: string
    sellerProfileImageUrl: string
  }
}

export default function SellerProfileCard({ sellerInfo }: SellerProfileCardProps) {
  const { user, isLogin } = useUserStore()
  const navigate = useNavigate()
  const goToUserPage = (sellerId: number) => {
    if (!isLogin) {
      // setIsModalOpen(true)
      // setModalMessage('로그인이 필요한 서비스입니다.')
    } else {
      navigate(`/user/${sellerId}`)
    }
  }
  return (
    sellerInfo?.sellerId !== user?.id && (
      <div className="flex justify-between rounded-lg border border-gray-300 p-5">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[#FACC15]">
            {sellerInfo.sellerProfileImageUrl ? (
              <img src={sellerInfo.sellerProfileImageUrl ?? ''} alt={sellerInfo?.sellerNickname} className="h-full w-full object-cover" />
            ) : (
              <div className="heading-h5 font-normal!">{sellerInfo?.sellerNickname.charAt(0).toUpperCase()}</div>
            )}
          </div>
          <h3 className="text-gray-900">{sellerInfo?.sellerNickname}</h3>
        </div>
        <Button
          size="sm"
          className="h-fit cursor-pointer border border-gray-300 bg-white text-sm text-gray-900"
          onClick={() => goToUserPage(sellerInfo.sellerId)}
        >
          판매자 프로필 보기
        </Button>
      </div>
    )
  )
}
