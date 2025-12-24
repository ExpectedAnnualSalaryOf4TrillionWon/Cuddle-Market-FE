import { useRef } from 'react'
import { Z_INDEX } from '@constants/ui'
import { cn } from '@utils/cn'
import { useIntersectionObserver } from '@hooks/useIntersectionObserver'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { fetchNotifications, patchNotifications, readNotification } from '@src/api/notifications'
import { useUserStore } from '@src/store/userStore'
import type { NotificationItem as NotificationItemType } from '@src/types/notifications'
import NotificationItem from './NotificationItem'
import { useNavigate } from 'react-router-dom'
import { getNavigationPath } from '@src/utils/getNavigationPath'
import { useOutsideClick } from '@src/hooks/useOutsideClick'
import NotificationsSkeleton from './NotificationsSkeleton'
import { useNotificationSSE } from '@src/hooks/useNotifications'
// import type { NotificationItem } from '@src/types/notifications'

interface NotificationsDropdownProps {
  isNotificationOpen: boolean
  setIsNotificationOpen: (isNotificationOpen: boolean) => void
  // notificationsDropdownRef: RefObject<HTMLDivElement | null>
}

export default function NotificationsDropdown({ isNotificationOpen, setIsNotificationOpen }: NotificationsDropdownProps) {
  const queryClient = useQueryClient()

  const user = useUserStore((state) => state.user)
  const navigate = useNavigate()
  const modalRef = useRef<HTMLDivElement>(null)
  useOutsideClick(isNotificationOpen, [modalRef], () => setIsNotificationOpen(false))
  const {
    data: notificationsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['notifications'],
    queryFn: ({ pageParam }) => fetchNotifications(pageParam),
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.page + 1 : undefined),
    initialPageParam: 0,
    enabled: !!user,
  })

  const observerTargetRef = useIntersectionObserver({
    enabled: hasNextPage ?? false,
    hasNextPage: hasNextPage ?? false,
    isFetchingNextPage,
    onIntersect: () => fetchNextPage(),
    threshold: 0.5,
  })

  const handleMarkAllAsRead = async () => {
    await patchNotifications()
    queryClient.setQueryData<{ unreadCount: number }>(['notifications', 'unreadCount'], {
      unreadCount: 0,
    })
    refetch()
  }

  const handleReadNotification = async (notification: NotificationItemType) => {
    if (!notification.isRead) {
      queryClient.setQueryData<{ unreadCount: number }>(['notifications', 'unreadCount'], (prev) => ({
        unreadCount: Math.max((prev?.unreadCount ?? 0) - 1, 0),
      }))
    }
    const path = getNavigationPath(notification)
    console.log('이동할 경로:', path)
    setIsNotificationOpen(false)
    // navigate(getNavigationPath(notification))
    navigate(path)
    await readNotification(notification.notificationId)
    refetch()
  }

  return (
    <div
      ref={modalRef}
      className={cn('absolute top-12 right-0 max-h-[819.2px] overflow-hidden rounded-lg border border-gray-200 bg-white', `${Z_INDEX.DROPDOWN}`)}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between border-b border-gray-200 px-4 pt-4 pb-[17px]">
        <div className="flex items-center gap-1">
          <h3 className="flex items-center justify-start text-lg font-semibold text-gray-900">알림</h3>
        </div>
        <button
          type="button"
          // disabled={unreadCount === 0 || markAllAsReadMutation.isPending}
          onClick={handleMarkAllAsRead}
          className="text-primary-600 flex cursor-pointer items-center justify-center text-center text-sm"
        >
          모두 읽음
        </button>
      </div>

      <div className="scrollbar-hide flex max-h-80 flex-col overflow-y-auto" role="tabpanel">
        {isLoading ? (
          <NotificationsSkeleton />
        ) : notificationsData?.pages.length !== 0 ? (
          <>
            {notificationsData?.pages.flatMap((page) =>
              page.content.map((notification: NotificationItemType) => (
                <NotificationItem
                  key={notification.notificationId}
                  {...notification}
                  setIsNotificationOpen={setIsNotificationOpen}
                  handleReadNotification={handleReadNotification}
                />
              ))
            )}
            <div ref={observerTargetRef} className="h-4" />
          </>
        ) : (
          <div className="flex h-32 min-w-[364px] items-center justify-center text-sm text-gray-500">표시할 알림이 없습니다.</div>
        )}
      </div>
      <div className="flex h-[45px] border-t border-gray-200" />
    </div>
  )
}
