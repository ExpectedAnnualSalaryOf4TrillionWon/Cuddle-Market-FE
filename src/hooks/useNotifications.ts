import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { EventSourcePolyfill } from 'event-source-polyfill'
import { useUserStore } from '@src/store/userStore'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'
// SSE 실시간 연결
export function useNotificationSSE() {
  const queryClient = useQueryClient()
  const user = useUserStore((state) => state.user)

  useEffect(() => {
    if (!user) {
      console.log('[SSE] 연결 안 함:', { hasUser: !!user })
      return
    }
    const token = useUserStore.getState().accessToken
    const eventSource = new EventSourcePolyfill(`${API_BASE_URL}/notifications/stream`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'text/event-stream',
      },
    })
    console.log('[SSE] 연결 시작')

    // notification 이벤트: 새 알림이 왔을 때
    eventSource.addEventListener('notification', (e) => {
      try {
        const payload = JSON.parse((e as MessageEvent).data)
        const notifications = Array.isArray(payload) ? payload : [payload]

        queryClient.setQueryData<{ unreadCount: number }>(['notifications', 'unreadCount'], (prev) => ({
          unreadCount: (prev?.unreadCount ?? 0) + 1,
        }))
        queryClient.invalidateQueries({ queryKey: ['notifications'] })
        console.log(`[SSE] 새 알림 ${notifications.length}건 수신`, notifications)
      } catch (err) {
        console.error('[SSE] notification payload 파싱 오류:', err)
      }
    })

    eventSource.onerror = (error) => {
      if (eventSource.readyState === EventSource.CLOSED) {
        return
      }
      console.error('[SSE] 연결 오류:', error)
    }

    eventSource.addEventListener('connect', () => {
      console.log('[SSE] 연결 성공')
    })

    return () => {
      console.log('[SSE] 연결 종료')
      eventSource.close()
    }
  }, [user, queryClient])
}
