// import Icon from '@components/commons/Icon'
import { Z_INDEX } from '@constants/ui'
import { cn } from '@utils/cn'
import { UserRound as UserRoundIcon, LogOut as LogOutIcon, MessageSquare } from 'lucide-react'
import { ROUTES } from '@src/constants/routes'
import { useUserStore } from '@src/store/userStore'
import { logout } from '@src/api/auth'
import { useLoginModalStore } from '@src/store/modalStore'
import { chatSocketStore } from '@src/store/chatSocketStore'
import { ProfileAvatar } from '@src/components/commons/ProfileAvatar'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { useOutsideClick } from '@src/hooks/useOutsideClick'

interface UserMenuProps {
  isNotificationOpen: boolean
  setIsNotificationOpen: (isNotificationOpen: boolean) => void
  isUserMenuOpen: boolean
  setIsUserMenuOpen: (isUserMenuOpen: boolean) => void
  userNickname?: string
}

export default function UserMenu({ isNotificationOpen, setIsNotificationOpen, isUserMenuOpen, setIsUserMenuOpen }: UserMenuProps) {
  const { user, clearAll } = useUserStore()
  const { openLogoutModal } = useLoginModalStore()
  const { disconnect } = chatSocketStore()
  const modalRef = useRef<HTMLDivElement>(null)
  useOutsideClick(isUserMenuOpen, [modalRef], () => setIsUserMenuOpen(false))

  const handleAvatarToggle = () => {
    if (isNotificationOpen) {
      setIsNotificationOpen(false)
    }
    setIsUserMenuOpen(!isUserMenuOpen)
  }

  // 로그아웃 실행 함수
  const onLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('로그아웃 API 실패:', error)
    } finally {
      setIsUserMenuOpen(false)
      disconnect() // WebSocket 연결 해제
      clearAll()
    }
  }

  // 로그아웃 버튼 클릭 시 확인 모달 열기
  const handleLogoutClick = () => {
    setIsUserMenuOpen(false)
    openLogoutModal(onLogout)
  }

  return (
    <div className="relative flex cursor-pointer items-center gap-2" onClick={handleAvatarToggle}>
      <ProfileAvatar imageUrl={user?.profileImageUrl} nickname={user?.nickname || ''} size="sm" />

      <p className="hidden text-base text-gray-700 md:block">{user?.nickname}</p>
      {isUserMenuOpen && (
        <div
          className={cn(
            'absolute top-12 right-0 flex w-32 flex-col divide-y divide-gray-100 rounded-lg border border-gray-200 bg-white shadow-lg md:w-48',
            `${Z_INDEX.BUTTON}`
          )}
          ref={modalRef}
        >
          <Link to={ROUTES.COMMUNITY} className="hover:bg-primary-50 flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700">
            <MessageSquare className="h-5 w-5" />
            커뮤니티
          </Link>
          <Link to={ROUTES.MYPAGE} className="hover:bg-primary-50 flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700">
            <UserRoundIcon className="h-5 w-5" />
            마이페이지
          </Link>
          <button
            onClick={handleLogoutClick}
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
