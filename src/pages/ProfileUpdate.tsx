import ProfileData from './my-page/components/ProfileData'
import { useState } from 'react'
import ProfileUpdateForm from './ProfileUpdateBaseForm'
import ProfileUpdatePasswordForm from './ProfileUpdatePasswordForm'

function ProfileUpdate() {
  const [, setIsWithdrawModalOpen] = useState(false)

  return (
    <div className="bg-bg pb-4xl pt-8">
      <div className="px-lg mx-auto flex max-w-[var(--container-max-width)] gap-8">
        <ProfileData setIsWithdrawModalOpen={setIsWithdrawModalOpen} />
        <div className="flex w-full flex-col gap-8">
          <ProfileUpdateForm />
          <ProfileUpdatePasswordForm />
        </div>
      </div>
    </div>
  )
}

export default ProfileUpdate
