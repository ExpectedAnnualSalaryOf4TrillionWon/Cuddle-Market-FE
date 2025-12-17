import ProfileData from '@src/components/profile/ProfileData'
import { useEffect, useState } from 'react'
import ProfileUpdateBaseForm from './components/ProfileUpdateBaseForm'
import { useQuery } from '@tanstack/react-query'
import { fetchMyPageData } from '@src/api/products'
import { useUserStore } from '@src/store/userStore'
import ProfileUpdatePasswordForm from './components/ProfileUpdatePasswordForm'
import { useMediaQuery } from '@src/hooks/useMediaQuery'

function ProfileUpdate() {
  const [, setIsWithdrawModalOpen] = useState(false)
  const { user, updateUserProfile } = useUserStore()
  const isMd = useMediaQuery('(min-width: 768px)')
  const { data: myData, isLoading: isLoadingMyData } = useQuery({
    queryKey: ['mypage', user?.id],
    queryFn: () => fetchMyPageData(),
    enabled: !!user,
  })

  useEffect(() => {
    if (myData) {
      updateUserProfile({
        profileImageUrl: myData.profileImageUrl,
        nickname: myData.nickname,
        name: myData.name,
        introduction: myData.introduction,
        birthDate: myData.birthDate,
        email: myData.email,
        addressSido: myData.addressSido,
        addressGugun: myData.addressGugun,
        createdAt: myData.createdAt,
      })
    }
  }, [myData, updateUserProfile])

  if (isLoadingMyData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="pb-4xl bg-[#F3F4F6] pt-0 md:bg-white md:pt-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-0 md:flex-row md:gap-8 md:p-0">
        {isMd && <ProfileData setIsWithdrawModalOpen={setIsWithdrawModalOpen} data={myData!} />}
        {!isMd && (
          <div className="flex flex-col gap-2 border-b border-gray-200 bg-white p-5">
            <h2 className="heading-h3">기본 정보</h2>
            <p className="text-gray-500">프로필 이미지, 닉네임, 거주지를 수정할 수 있습니다</p>
          </div>
        )}
        <div className="flex w-full flex-col gap-8 p-5 md:p-0">
          <ProfileUpdateBaseForm myData={myData!} />
          <ProfileUpdatePasswordForm />
        </div>
      </div>
    </div>
  )
}

export default ProfileUpdate
