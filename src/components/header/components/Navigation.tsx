import UserMenu from '../components/user-section/UserMenu'
import AuthMenu from '../components/user-section/AuthMenu'
import { useState } from 'react'
import { useUserStore } from '@src/store/userStore'
import { Link } from 'react-router-dom'
import { ROUTES } from '@src/constants/routes'
import { MessageCircleMore, Bell } from 'lucide-react'
import { IconButton } from '@src/components/commons/button/IconButton'
import NotificationsDropdown from './notification-section/NotificationsDropdown'
import { useQuery } from '@tanstack/react-query'
import { getUnreadCount } from '@src/api/notifications'
import { useNotificationSSE } from '@src/hooks/useNotifications'

export default function Navigation() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const user = useUserStore((state) => state.user)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const { isLogin } = useUserStore()
  useNotificationSSE()
  const handleBellToggle = () => {
    setIsNotificationOpen(!isNotificationOpen)
  }
  const { data: unreadCountData } = useQuery({
    queryKey: ['notifications', 'unreadCount'],
    queryFn: () => getUnreadCount(),
    enabled: !!user,
  })

  return (
    <div className="flex items-center gap-2 md:gap-4">
      {isLogin() ? (
        <>
          <Link to={ROUTES.CHAT} className="">
            <MessageCircleMore />
          </Link>
          <div className="relative" onClick={handleBellToggle}>
            <IconButton aria-label="알림" size="lg" className="hover:bg-transparent">
              <Bell size={24} className="stroke-gray-600" />
            </IconButton>
            {(unreadCountData?.unreadCount ?? 0) > 0 && (
              <span className="bg-danger-500 absolute top-0 -right-2 flex size-5 items-center justify-center rounded-full p-2 text-sm text-white">
                {unreadCountData?.unreadCount}
              </span>
            )}
            {isNotificationOpen && <NotificationsDropdown isNotificationOpen={isNotificationOpen} setIsNotificationOpen={setIsNotificationOpen} />}
          </div>

          <UserMenu
            isNotificationOpen={false}
            setIsNotificationOpen={setIsNotificationOpen}
            isUserMenuOpen={isUserMenuOpen}
            setIsUserMenuOpen={setIsUserMenuOpen}
          />
        </>
      ) : (
        <AuthMenu />
      )}
    </div>
  )
}
