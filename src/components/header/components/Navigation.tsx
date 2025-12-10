import UserMenu from '../components/user-section/UserMenu'
import AuthMenu from '../components/user-section/AuthMenu'
import NotificationButton from '../components/notification-section/NotificationButton'
import { useState } from 'react'
import { useUserStore } from '@src/store/userStore'
import { Link } from 'react-router-dom'
import { ROUTES } from '@src/constants/routes'
import { MessageSquare } from 'lucide-react'

export default function Navigation() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const { isLogin } = useUserStore()

  return (
    <div className="flex items-center gap-4">
      {isLogin() ? (
        <>
          <Link to={ROUTES.COMMUNITY}>
            <MessageSquare />
          </Link>
          <NotificationButton
            isNotificationOpen={isNotificationOpen}
            setIsNotificationOpen={setIsNotificationOpen}
            isUserMenuOpen={isUserMenuOpen}
            setIsUserMenuOpen={setIsUserMenuOpen}
          />
          <UserMenu
            isNotificationOpen={isNotificationOpen}
            setIsNotificationOpen={setIsNotificationOpen}
            isUserMenuOpen={isUserMenuOpen}
            setIsUserMenuOpen={setIsUserMenuOpen}
            // userNickname={userNickname}
          />
        </>
      ) : (
        <AuthMenu />
      )}
    </div>
  )
}
