import { Link, useNavigate } from 'react-router-dom'
import { MapPin, Calendar, Settings } from 'lucide-react'
import { ProductMetaItem } from '@src/components/product/ProductMetaItem'
import CuddleMarketLogo from '@assets/images/CuddleMarketLogoImage.png'
import { useQuery } from '@tanstack/react-query'
import { fetchMyPageData } from '@src/api/products'
import { useUserStore } from '@src/store/userStore'
import { type Dispatch, type SetStateAction } from 'react'

interface ProfileDataProps {
  setIsWithdrawModalOpen: Dispatch<SetStateAction<boolean>>
}

const formatJoinDate = (dateString: string): string => {
  const date = new Date(dateString)
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월`
}

export default function ProfileData({ setIsWithdrawModalOpen }: ProfileDataProps) {
  const { user } = useUserStore()
  const navigate = useNavigate()

  const handleWithdrawModal = () => {
    setIsWithdrawModalOpen(true)
  }
  const {
    data: myData,
    isLoading: isLoadingMyData,
    error: errorMyData,
  } = useQuery({
    queryKey: ['mypage', user?.id],
    queryFn: () => fetchMyPageData(),
    enabled: !!user,
  })
  if (isLoadingMyData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (errorMyData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <button onClick={() => navigate('/')} className="text-blue-600 hover:text-blue-800">
            목록으로 돌아가기
          </button>
        </div>
      </div>
    )
  }

  return (
    <section className="border-border flex h-fit min-w-72 flex-col rounded-xl border p-5">
      <div className="text-text-primary sticky top-24 flex flex-col rounded-xl">
        <div className="flex flex-col gap-6 border-b border-gray-300 pb-8">
          <div className="flex flex-col items-center gap-3.5 pb-7">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-[#FACC15]">
              {myData?.profileImageUrl ? (
                <img src={myData.profileImageUrl ?? CuddleMarketLogo} alt={myData.nickname} className="h-full w-full object-cover" />
              ) : (
                <div className="heading-h4">{myData?.nickname.charAt(0).toUpperCase()}</div>
              )}
            </div>
            <h3 className="heading-h5 text-text-primary mb-sm">{myData?.nickname}</h3>
            <p className="w-full text-sm font-semibold text-gray-500">{myData?.introduction ? myData.introduction : '소개글을을 작성해주세요'}</p>
          </div>
          <div className="flex flex-col gap-3.5">
            <div className="flex flex-col gap-2.5">
              <ProductMetaItem icon={MapPin} iconSize={17} label={`${myData?.addressSido} ${myData?.addressGugun}`} className="gap-2" />
              <ProductMetaItem
                icon={Calendar}
                iconSize={17}
                label={`가입일: ${myData?.createdAt ? formatJoinDate(myData.createdAt) : ''}`}
                className="gap-2"
              />
            </div>
            <Link
              to="/profile-update"
              className="bg-primary-200 text-bg flex items-center justify-center gap-2.5 rounded-lg px-3 py-2 transition-all"
            >
              <Settings size={19} />
              <span>내 정보 수정</span>
            </Link>
          </div>
        </div>

        <button className="w-full cursor-pointer pt-8 text-left text-sm text-gray-500" type="button" onClick={handleWithdrawModal}>
          회원탈퇴
        </button>
      </div>
    </section>
  )
}
