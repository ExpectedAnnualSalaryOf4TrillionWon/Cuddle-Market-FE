import { Link } from 'react-router-dom'
import { MapPin, Calendar, Settings, MessageCircle } from 'lucide-react'
import { ProductMetaItem } from '@src/components/product/ProductMetaItem'
import CuddleMarketLogo from '@assets/images/CuddleMarketLogoImage.png'
import { type Dispatch, type SetStateAction } from 'react'
import { formatJoinDate } from '@src/utils/formatJoinDate'
import type { Product } from '@src/types'
import { useUserStore } from '@src/store/userStore'

export interface MyPageData {
  id: number
  profileImageUrl?: string
  nickname: string
  name?: string
  introduction?: string
  birthDate?: string
  email?: string
  addressSido: string
  addressGugun: string
  createdAt: string
  products?: Product[]
}

interface ProfileDataProps {
  data?: MyPageData
  setIsWithdrawModalOpen: Dispatch<SetStateAction<boolean>>
}

export default function ProfileData({ setIsWithdrawModalOpen, data }: ProfileDataProps) {
  const handleWithdrawModal = () => {
    setIsWithdrawModalOpen(true)
  }
  const { user } = useUserStore()

  console.log('[ProfileData] user?.id:', user?.id, 'data?.id:', data?.id, 'isEqual:', user?.id === data?.id)

  return (
    <section className="border-border flex h-fit min-w-72 flex-col rounded-xl border p-5">
      <div className="text-text-primary sticky top-24 flex flex-col rounded-xl">
        <div className="flex flex-col gap-6 border-b border-gray-300 pb-8">
          <div className="flex flex-col items-center gap-3.5 pb-7">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-[#FACC15]">
              {data?.profileImageUrl ? (
                <img src={data.profileImageUrl ?? CuddleMarketLogo} alt={data.nickname} className="h-full w-full object-cover" />
              ) : (
                <div className="heading-h4">{data?.nickname.charAt(0).toUpperCase()}</div>
              )}
            </div>
            <h3 className="heading-h5 text-text-primary mb-sm">{data?.nickname}</h3>
            <p className="w-full text-sm font-semibold text-gray-500">{data?.introduction ? data.introduction : '소개글을을 작성해주세요'}</p>
          </div>
          <div className="flex flex-col gap-3.5">
            <div className="flex flex-col gap-2.5">
              <ProductMetaItem icon={MapPin} iconSize={17} label={`${data?.addressSido} ${data?.addressGugun}`} className="gap-2" />
              <ProductMetaItem
                icon={Calendar}
                iconSize={17}
                label={`가입일: ${data?.createdAt ? formatJoinDate(data.createdAt) : ''}`}
                className="gap-2"
              />
            </div>

            {user?.id === data?.id ? (
              <Link
                to="/profile-update"
                className="bg-primary-200 text-bg flex items-center justify-center gap-2.5 rounded-lg px-3 py-2 transition-all"
              >
                <Settings size={19} />
                <span>내 정보 수정</span>
              </Link>
            ) : (
              <Link
                to="/profile-update"
                className="bg-primary-200 text-bg flex items-center justify-center gap-2.5 rounded-lg px-3 py-2 transition-all"
              >
                <MessageCircle size={19} />
                <span>채팅하기</span>
              </Link>
            )}
          </div>
        </div>

        <button className="w-full cursor-pointer pt-8 text-left text-sm text-gray-500" type="button" onClick={handleWithdrawModal}>
          회원탈퇴
        </button>
      </div>
    </section>
  )
}
