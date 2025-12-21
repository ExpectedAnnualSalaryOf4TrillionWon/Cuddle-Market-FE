import UserMenu from '../components/user-section/UserMenu'
import AuthMenu from '../components/user-section/AuthMenu'
import { useRef, useState } from 'react'
import { useUserStore } from '@src/store/userStore'
import { Link } from 'react-router-dom'
import { ROUTES } from '@src/constants/routes'
import { MessageCircleMore, Bell } from 'lucide-react'
import { IconButton } from '@src/components/commons/button/IconButton'
import { cn } from '@utils/cn'
import { Z_INDEX } from '@src/constants/ui'
// import NotificationsDropdown from './notification-section/NotificationsDropdown'

export default function Navigation() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const { isLogin } = useUserStore()
  const modalRef = useRef<HTMLDivElement>(null)
  const notificationsDropdownRef = useRef<HTMLDivElement>(null)
  const handleBellToggle = () => {
    setIsUserMenuOpen(!isNotificationOpen)
  }

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
            {/* {isNotificationOpen && (
              <NotificationsDropdown notificationsDropdownRef={notificationsDropdownRef} setIsNotificationOpen={setIsNotificationOpen} />
            )} */}
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
