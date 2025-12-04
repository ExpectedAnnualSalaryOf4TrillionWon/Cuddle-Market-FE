// import Icon from '@components/commons/Icon'
import { Z_INDEX } from '@constants/ui'
// import { useOutsideClick } from '@src/hooks/useOutsideClick'
import { cn } from '@utils/cn'
import CuddleMarketLogo from '@assets/images/CuddleMarketLogoImage.png'
import { UserRound as UserRoundIcon, LogOut as LogOutIcon } from 'lucide-react'
// import { useRef } from 'react'
// import { EXTERNAL } from '@src/constants/external'
// import { logoutHard } from '@src/store/auth'
import { ROUTES } from '@src/constants/routes'
import { useUserStore } from '@src/store/userStore'

interface UserMenuProps {
  isNotificationOpen: boolean
  setIsNotificationOpen: (isNotificationOpen: boolean) => void
  isUserMenuOpen: boolean
  setIsUserMenuOpen: (isUserMenuOpen: boolean) => void
  userNickname?: string
}

export default function UserMenu({ isNotificationOpen, setIsNotificationOpen, isUserMenuOpen, setIsUserMenuOpen }: UserMenuProps) {
  const { user } = useUserStore()

  const handleAvatarToggle = () => {
    if (isNotificationOpen) {
      setIsNotificationOpen(false)
    }
    setIsUserMenuOpen(!isUserMenuOpen)
  }

  return (
    <div
      // ref={userMenuButtonRef}
      className="relative flex cursor-pointer items-center gap-2"
      onClick={handleAvatarToggle}
    >
      <div className="bg-primary-100 flex h-8 w-8 items-center justify-center overflow-hidden rounded-full">
        <img src={user?.profileImageUrl ?? CuddleMarketLogo} alt={user?.nickname} className="h-full w-full object-cover" />
      </div>

      <p className="text-base text-gray-700">{user?.nickname}</p>
      {isUserMenuOpen && (
        <div
          className={cn(
            'absolute top-12 right-0 flex w-48 flex-col divide-y divide-gray-100 rounded-lg border border-gray-200 bg-white shadow-lg',
            `${Z_INDEX.DROPDOWN}`
          )}
        >
          <a href={ROUTES.MYPAGE} className="hover:bg-primary-50 flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700">
            <UserRoundIcon className="h-5 w-5" />
            마이페이지
          </a>
          <button
            // onClick={handleLogout}
            className="hover:bg-primary-50 text-danger-500 flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-sm"
          >
            <LogOutIcon className="h-5 w-5 rotate-180" />
            로그아웃
          </button>
        </div>
      )}
    </div>
  )
}
