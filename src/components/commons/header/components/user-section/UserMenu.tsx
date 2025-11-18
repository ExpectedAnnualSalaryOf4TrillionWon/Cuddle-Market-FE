// import Icon from '@components/commons/Icon'
import { Z_INDEX } from '@constants/ui'
// import { useOutsideClick } from '@src/hooks/useOutsideClick'
import { cn } from '@utils/cn'
import { UserRound as UserRoundIcon, LogOut as LogOutIcon } from 'lucide-react'
import { useRef } from 'react'
// import { EXTERNAL } from '@src/constants/external'
// import { logoutHard } from '@src/store/auth'
import { ROUTES } from '@src/constants/routes'

interface UserMenuProps {
  isNotificationOpen: boolean
  setIsNotificationOpen: (isNotificationOpen: boolean) => void
  isUserMenuOpen: boolean
  setIsUserMenuOpen: (isUserMenuOpen: boolean) => void
  userNickname?: string
}

export default function UserMenu({ isNotificationOpen, setIsNotificationOpen, isUserMenuOpen, setIsUserMenuOpen, userNickname }: UserMenuProps) {
  const userMenuButtonRef = useRef<HTMLDivElement>(null)
  const userMenuPanelRef = useRef<HTMLDivElement>(null)
  const handleAvatarToggle = () => {
    // 알림드롭다운 ui 가 열려있다면 알림드롭다운 닫기
    if (isNotificationOpen) {
      setIsNotificationOpen(false)
    }
    // 마이페이지 ui 토글
    setIsUserMenuOpen(!isUserMenuOpen)
  }

  // const handleLogout = async () => {
  //   await logoutHard()
  // }
  // useOutsideClick(isUserMenuOpen, [userMenuButtonRef, userMenuPanelRef], () =>
  //   setIsUserMenuOpen(false)
  // )

  return (
    <div ref={userMenuButtonRef} className="relative flex cursor-pointer items-center gap-2" onClick={handleAvatarToggle}>
      <div className="bg-primary-100 flex h-8 w-8 items-center justify-center rounded-full">
        {/* <Icon icon={UserRoundIcon} size="sm" className={`stroke-primary-600`} /> */}
      </div>

      <p className="text-base text-gray-700">{userNickname}</p>
      {isUserMenuOpen && (
        <div
          ref={userMenuPanelRef}
          className={cn(
            'absolute top-12 right-0 flex w-48 flex-col divide-y divide-gray-100 rounded-lg border border-gray-200 bg-white py-2 shadow-lg',
            `${Z_INDEX.DROPDOWN}`
          )}
        >
          <a href={ROUTES.MYPAGE} className="flex w-full items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
            <UserRoundIcon className="h-4 w-4" />
            마이페이지
          </a>
          <button
            // onClick={handleLogout}
            className="flex w-full items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            <LogOutIcon className="h-4 w-4 rotate-180" />
            로그아웃
          </button>
        </div>
      )}
    </div>
  )
}
