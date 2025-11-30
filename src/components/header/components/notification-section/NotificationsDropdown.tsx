// import { useEffect, useMemo, useState, type RefObject } from 'react'
// import { Z_INDEX } from '@constants/ui'
// import { cn } from '@utils/cn'
// import NotificationTabs from './NotificationTabs'
// import NotificationItem from './NotificationItem'
// import NotificationsSkeleton from './NotificationsSkeleton'
// import {
//   useNotifications,
//   useMarkAllAsRead,
//   useUnreadCountQuery,
// } from '@hooks/useNotifications'
// import { useIntersectionObserver } from '@hooks/useIntersectionObserver'

// interface NotificationsDropdownProps {
//   setIsNotificationOpen: (isNotificationOpen: boolean) => void
//   notificationsDropdownRef: RefObject<HTMLDivElement | null>
// }

// export default function NotificationsDropdown({
//   setIsNotificationOpen,
//   notificationsDropdownRef,
// }: NotificationsDropdownProps) {
//   const [notificationFilter, setNotificationFilter] = useState<
//     'all' | 'unread' | 'read'
//   >('all')

//   const {
//     notifications,
//     totalCount,
//     isLoading,
//     error,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//   } = useNotifications()

//   const { unreadCount } = useUnreadCountQuery()
//   const markAllAsReadMutation = useMarkAllAsRead()

//   const handleMarkAllAsRead = () => {
//     if (unreadCount === 0 || markAllAsReadMutation.isPending) {
//       return
//     }

//     markAllAsReadMutation.mutate()
//     if (notificationFilter === 'unread') {
//       setNotificationFilter('all')
//     }
//   }
//   const observerTargetRef = useIntersectionObserver({
//     enabled: true,
//     hasNextPage,
//     isFetchingNextPage,
//     onIntersect: () => fetchNextPage(),
//     threshold: 0.5,
//   })

//   const filteredNotifications = useMemo(() => {
//     switch (notificationFilter) {
//       case 'unread':
//         return notifications.filter((notification) => !notification.is_read)
//       case 'read':
//         return notifications.filter((notification) => notification.is_read)
//       default:
//         return notifications
//     }
//   }, [notifications, notificationFilter])

//   // unreadCount가 0이 되면 자동으로 전체보기로
//   useEffect(() => {
//     if (unreadCount === 0 && notificationFilter === 'unread') {
//       setNotificationFilter('all')
//     }
//   }, [unreadCount, notificationFilter])

//   return (
//     <div
//       ref={notificationsDropdownRef}
//       className={cn(
//         'absolute top-12 right-0 max-h-[819.2px] overflow-hidden rounded-lg border border-gray-200 bg-white',
//         `${Z_INDEX.DROPDOWN}`
//       )}
//       onClick={(e) => e.stopPropagation()}
//     >
//       <div className="flex items-center justify-between px-4 pt-4 pb-[17px]">
//         <h3 className="flex items-center justify-start text-lg font-semibold text-gray-900">
//           알림
//         </h3>
//         <button
//           type="button"
//           disabled={unreadCount === 0 || markAllAsReadMutation.isPending}
//           onClick={handleMarkAllAsRead}
//           className="text-primary-600 flex cursor-pointer items-center justify-center text-center text-sm"
//         >
//           {markAllAsReadMutation.isPending ? '처리 중…' : '모두 읽음'}
//         </button>
//       </div>

//       <NotificationTabs
//         setNotificationFilter={setNotificationFilter}
//         notificationFilter={notificationFilter}
//         notifications={notifications}
//         totalCount={totalCount}
//         unreadCount={unreadCount}
//       />

//       <div
//         className="scrollbar-hide flex max-h-80 flex-col overflow-y-auto"
//         role="tabpanel"
//       >
//         {isLoading ? (
//           <NotificationsSkeleton />
//         ) : error ? (
//           <div className="flex h-32 min-w-[364px] items-center justify-center text-sm text-red-500">
//             알림을 불러오는데 실패했습니다.
//           </div>
//         ) : filteredNotifications.length !== 0 ? (
//           <>
//             {filteredNotifications.map((notification) => (
//               <NotificationItem
//                 key={notification.notification_id}
//                 {...notification}
//                 setIsNotificationOpen={setIsNotificationOpen}
//               />
//             ))}
//             <div ref={observerTargetRef} className="h-4" />
//             {isFetchingNextPage && (
//               <div className="flex items-center justify-center py-4 text-sm text-gray-500">
//                 로딩 중...
//               </div>
//             )}
//           </>
//         ) : (
//           <div className="flex h-32 min-w-[364px] items-center justify-center text-sm text-gray-500">
//             표시할 알림이 없습니다.
//           </div>
//         )}
//       </div>
//       <div className="flex h-[45px] bg-gray-50" />
//     </div>
//   )
// }
