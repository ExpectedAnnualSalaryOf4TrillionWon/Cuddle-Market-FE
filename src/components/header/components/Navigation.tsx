import UserMenu from '../components/user-section/UserMenu'
import AuthMenu from '../components/user-section/AuthMenu'
import { useState } from 'react'
import { useUserStore } from '@src/store/userStore'
import { Link } from 'react-router-dom'
import { ROUTES } from '@src/constants/routes'
import { MessageCircleMore, Bell } from 'lucide-react'
import { IconButton } from '@src/components/commons/button/IconButton'

export default function Navigation() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [, setIsNotificationOpen] = useState(false)
  const { isLogin } = useUserStore()

  return (
    <div className="flex items-center gap-2 md:gap-4">
      {isLogin() ? (
        <>
          <Link to={ROUTES.CHAT} className="">
            <MessageCircleMore />
          </Link>
          <IconButton aria-label="알림" size="lg" className="hover:bg-transparent">
            <Bell size={24} className="stroke-gray-600" />
          </IconButton>
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
