import { Link, useLocation } from 'react-router-dom'
import { MapPin, Calendar, Settings, MessageCircle, Flag, Ban, LockOpen, ShieldAlert } from 'lucide-react'
import { ProductMetaItem } from '@src/components/product/ProductMetaItem'
import { type Dispatch, type SetStateAction } from 'react'
import { formatJoinDate } from '@src/utils/formatJoinDate'
import { useUserStore } from '@src/store/userStore'
import { Button } from '@src/components/commons/button/Button'
import { userUnBlocked } from '@src/api/profile'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ROUTES } from '@src/constants/routes'
import { useMediaQuery } from '@src/hooks/useMediaQuery'

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
  isBlocked?: boolean
  isReported?: boolean
}

interface ProfileDataProps {
  data?: MyPageData
  setIsWithdrawModalOpen?: Dispatch<SetStateAction<boolean>>
  setIsReportModalOpen?: Dispatch<SetStateAction<boolean>>
  setIsBlockModalOpen?: Dispatch<SetStateAction<boolean>>
  handleUserUnBlocked?: (id: number) => void
}

export default function ProfileData({ setIsWithdrawModalOpen, setIsReportModalOpen, setIsBlockModalOpen, data }: ProfileDataProps) {
  const { user } = useUserStore()
  const isMyProfile = user?.id === data?.id
  const queryClient = useQueryClient()
  const isMd = useMediaQuery('(min-width: 768px)')
  const { pathname } = useLocation()
  const isProfileEditPage = /^\/profile-update$/.test(pathname)

  const { mutate: unblockUser } = useMutation({
    mutationFn: () => userUnBlocked(Number(data?.id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userPage'] })
    },
    onError: (error) => {
      console.error('차단 해제 실패:', error)
    },
  })

  const formattedJoinDate = data?.createdAt ? formatJoinDate(data.createdAt) : ''

  return (
    <section className="flex h-fit flex-col rounded-none border-b border-gray-200 px-5 py-0 pt-5 md:max-w-72 md:min-w-72 md:rounded-xl md:border md:py-5">
      <div className="text-text-primary sticky top-24 flex flex-col rounded-xl">
        <div className="flex flex-col gap-3 md:gap-6">
          <div className="flex flex-row items-center gap-3.5 md:flex-col">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-[#FACC15]">
              {data?.profileImageUrl ? (
                <img src={data.profileImageUrl} alt={data.nickname} className="h-full w-full object-cover" />
              ) : (
                <div className="heading-h4">{data?.nickname.charAt(0).toUpperCase()}</div>
              )}
            </div>

            {isMd ? (
              // 데스크탑 공통 표시
              <h3 className="heading-h5 text-text-primary">{data?.nickname}</h3>
            ) : (
              // 모바일 내 정보
              <div>
                <h3 className="heading-h5 text-text-primary pb-0.5">{data?.nickname}</h3>
                <p className="text-sm font-semibold text-gray-500">
                  {data?.addressSido} {data?.addressGugun}
                </p>
                <p className="text-sm font-semibold text-gray-500">{formattedJoinDate} 가입</p>
              </div>
            )}
          </div>
          <p className="w-full text-sm font-semibold text-gray-500">{data?.introduction || '소개글을 작성해주세요'}</p>
          {/* 데스크탑 내 정보 */}
          {isMyProfile && (
            <>
              <div className="flex flex-col gap-3.5">
                {isMd && (
                  <div className="flex flex-col gap-2.5">
                    <ProductMetaItem icon={MapPin} iconSize={17} label={`${data?.addressSido} ${data?.addressGugun}`} className="gap-2" />
                    <ProductMetaItem icon={Calendar} iconSize={17} label={`가입일: ${formattedJoinDate}`} className="gap-2" />
                  </div>
                )}
                {!isProfileEditPage && (
                  <Link
                    to={ROUTES.PROFILE_UPDATE}
                    className="bg-primary-200 flex items-center justify-center gap-2.5 rounded-lg px-3 py-2 text-white transition-all"
                  >
                    <Settings size={19} />
                    <span>내 정보 수정</span>
                  </Link>
                )}
              </div>
              {!isProfileEditPage && (
                <button
                  type="button"
                  className="w-full cursor-pointer rounded-lg border-gray-300 pb-5 text-right text-sm text-gray-500 hover:underline md:border-t md:pt-6 md:pb-0 md:text-left"
                  onClick={() => setIsWithdrawModalOpen?.(true)}
                >
                  회원탈퇴
                </button>
              )}
            </>
          )}

          {/* 다른 유저 프로필 */}
          {!isMyProfile && (
            <>
              <div className="flex flex-col gap-3.5">
                {data?.isBlocked ? (
                  <>
                    <div className="bg-danger-100/30 border-danger-100 text-danger-800 flex items-center justify-center gap-2 rounded-lg border p-2.5 font-medium">
                      <ShieldAlert />
                      <span>이 사용자를 차단했습니다</span>
                    </div>
                    <Button
                      icon={LockOpen}
                      onClick={() => unblockUser()}
                      className="bg-primary-200 flex cursor-pointer items-center justify-center gap-2.5 rounded-lg px-3 py-2 text-white transition-all"
                    >
                      차단 해제하기
                    </Button>
                  </>
                ) : (
                  <Link to="#" className="bg-primary-200 flex items-center justify-center gap-2.5 rounded-lg px-3 py-2 text-white transition-all">
                    <MessageCircle size={19} />
                    <span>채팅하기</span>
                  </Link>
                )}
              </div>
              <div className="flex items-center justify-between">
                {data?.isReported ? (
                  <div className="flex w-full items-center justify-start gap-2 px-3 py-1.5 text-sm text-gray-500">
                    <Flag size={16} className="text-gray-500" />
                    <span>신고완료</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="flex w-full cursor-pointer items-center justify-start gap-2 rounded-lg border-t border-gray-300 bg-transparent px-3 py-1.5 pt-6 text-sm text-gray-500 hover:bg-gray-100"
                    onClick={() => setIsReportModalOpen?.(true)}
                  >
                    <Flag size={16} />
                    신고하기
                  </button>
                )}

                {!data?.isBlocked && (
                  <button
                    type="button"
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-transparent px-3 py-1.5 text-sm text-gray-500 hover:bg-gray-100"
                    onClick={() => setIsBlockModalOpen?.(true)}
                  >
                    <Ban size={16} />
                    차단하기
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
