// import { tabClass } from './notificationIconClass'
// import type { NotificationItem } from '@src/types/notification'
// import { cn } from '@utils/cn'

// interface NotificationTabsProps {
//   setNotificationFilter: (filter: 'all' | 'unread' | 'read') => void
//   notificationFilter: 'all' | 'unread' | 'read'
//   notifications: NotificationItem[]
//   totalCount: number
//   unreadCount: number
// }
// export default function NotificationTabs({
//   setNotificationFilter,
//   notificationFilter,
//   notifications,
//   unreadCount,
//   totalCount,
// }: NotificationTabsProps) {
//   const readCount = notifications.filter(
//     (notification) => notification.is_read
//   ).length
//   const isUnreadTabDisabled = unreadCount === 0
//   const isReadTabDisabled = unreadCount === 0
//   const handleTabClick = (filter: 'all' | 'unread' | 'read') => {
//     // 읽지않음 탭이 비활성화된 경우 클릭 무시
//     if (
//       (filter === 'unread' && isUnreadTabDisabled) ||
//       (filter === 'read' && isReadTabDisabled)
//     ) {
//       return
//     }
//     setNotificationFilter(filter)
//   }

//   return (
//     <div className="flex w-full max-w-md min-w-[320px]" role="tablist">
//       <button
//         role="tab"
//         onClick={() => handleTabClick('all')}
//         className={cn(
//           'flex-1',
//           tabClass({
//             active: notificationFilter === 'all',
//           })
//         )}
//       >
//         전체보기 ({totalCount})
//       </button>
//       <button
//         role="tab"
//         onClick={() => handleTabClick('unread')}
//         className={cn(
//           'flex-1',
//           tabClass({
//             active: notificationFilter === 'unread' && !isUnreadTabDisabled,
//           }),
//           isUnreadTabDisabled && 'cursor-not-allowed text-gray-400 opacity-50'
//         )}
//       >
//         읽지 않음 ({unreadCount})
//       </button>
//       <button
//         role="tab"
//         onClick={() => handleTabClick('read')}
//         className={cn(
//           'flex-1',
//           tabClass({
//             active: notificationFilter === 'read' && !isReadTabDisabled,
//           }),
//           isReadTabDisabled && 'cursor-not-allowed text-gray-400 opacity-50'
//         )}
//       >
//         읽음 ({readCount})
//       </button>
//     </div>
//   )
// }
