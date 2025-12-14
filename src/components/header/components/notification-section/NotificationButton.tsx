import { Button } from '@src/components/commons/button/Button'
// import { useRef } from 'react'
// import { useOutsideClick } from '@src/hooks/useOutsideClick'
// import Icon from '@components/commons/Icon'
import { Bell as BellIcon } from 'lucide-react'
// import NotificationsDropdown from './NotificationsDropdown'
// import { useUnreadCountQuery } from '@hooks/useNotifications'

interface NotificationButtonProps {
  isNotificationOpen: boolean
  setIsNotificationOpen: (isNotificationOpen: boolean) => void
  isUserMenuOpen: boolean
  setIsUserMenuOpen: (isUserMenuOpen: boolean) => void
}

export default function NotificationButton({
  isNotificationOpen: _isNotificationOpen,
  setIsNotificationOpen: _setIsNotificationOpen,
  isUserMenuOpen: _isUserMenuOpen,
  setIsUserMenuOpen: _setIsUserMenuOpen,
}: NotificationButtonProps) {
  // const { unreadCount } = useUnreadCountQuery()

  // const notificationsDropdownRef = useRef<HTMLDivElement>(null)
  // const notificationButtonRef = useRef<HTMLDivElement>(null)

  // const handleNotificationToggle = () => {
  //   // 마이페이지 ui가 열려있다면 마이페이지 ui 닫기
  //   if (isUserMenuOpen) {
  //     setIsUserMenuOpen(false)
  //   }
  //   // 알림드롭다운 토글
  //   setIsNotificationOpen(!isNotificationOpen)
  // }

  // useOutsideClick(
  //   isNotificationOpen, // 드롭다운이 열려있는지
  //   [notificationButtonRef, notificationsDropdownRef], // 안쪽으로 취급할 영역들
  //   () => setIsNotificationOpen(false) // 바깥 클릭시 실행할 함수
  // )

  return (
    <div className="relative">
      {/* <div
        ref={notificationButtonRef}
        className="relative flex size-10 cursor-pointer items-center justify-center rounded-full hover:bg-gray-100"
        onClick={handleNotificationToggle}
      > */}
      <Button type="button" icon={BellIcon} size="lg" className="" />
      {/* <Icon icon={BellIcon} size="md" className={`stroke-gray-600`} /> */}
      {/* {unreadCount > 0 && (
          <span className="bg-danger-500 absolute -top-1 left-6 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs font-semibold text-white">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )} */}
      {/* </div> */}
      {/* {isNotificationOpen && (
        <NotificationsDropdown notificationsDropdownRef={notificationsDropdownRef} setIsNotificationOpen={setIsNotificationOpen} />
      )} */}
    </div>
  )
}
