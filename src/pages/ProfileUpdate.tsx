import ProfileData from './my-page/components/ProfileData'
import { useEffect, useState } from 'react'
import ProfileUpdateBaseForm from './ProfileUpdateBaseForm'
import ProfileUpdatePasswordForm from './ProfileUpdatePasswordForm'
import { useQuery } from '@tanstack/react-query'
import { fetchMyPageData } from '@src/api/products'
import { useUserStore } from '@src/store/userStore'

function ProfileUpdate() {
  const [, setIsWithdrawModalOpen] = useState(false)
  const { user, updateUserProfile } = useUserStore()

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
    <div className="bg-bg pb-4xl pt-8">
      <div className="px-lg mx-auto flex max-w-[var(--container-max-width)] gap-8">
        <ProfileData setIsWithdrawModalOpen={setIsWithdrawModalOpen} myData={myData!} />
        <div className="flex w-full flex-col gap-8">
          <ProfileUpdateBaseForm myData={myData!} />
          <ProfileUpdatePasswordForm />
        </div>
      </div>
    </div>
  )
}

export default ProfileUpdate
