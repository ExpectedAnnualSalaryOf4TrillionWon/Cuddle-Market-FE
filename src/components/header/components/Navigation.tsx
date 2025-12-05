import UserMenu from '../components/user-section/UserMenu'
import AuthMenu from '../components/user-section/AuthMenu'
import NotificationButton from '../components/notification-section/NotificationButton'
import { useState } from 'react'
import { useUserStore } from '@src/store/userStore'
// import { useAuth } from '@src/store/auth'

export default function Navigation() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const { isLogin } = useUserStore()

  return (
    <div className="flex items-center gap-2">
      {isLogin() ? (
        <>
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
