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
  // const isLoggedIn = false
  // const isLoggedIn = useAuth((state) => state.isLoggedIn())
  // const userNickname = useAuth((state) => state.user?.nickname ?? '사용자')
  // const bootstrapped = useAuth((state) => state.bootstrapped)

  // if (!bootstrapped) {
  //   return (
  //     <div className="flex items-center gap-4">
  //       <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />
  //       <div className="h-6 w-20 animate-pulse rounded bg-gray-200" />
  //     </div>
  //   )
  // }

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
