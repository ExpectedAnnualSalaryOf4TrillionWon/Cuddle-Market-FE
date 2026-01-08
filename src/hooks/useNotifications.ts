import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import { EventSourcePolyfill } from 'event-source-polyfill'
import { useUserStore } from '@src/store/userStore'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'
// SSE 실시간 연결
export function useNotificationSSE() {
  const queryClient = useQueryClient()
  const user = useUserStore((state) => state.user)
  const accessToken = useUserStore((state) => state.accessToken)
  const eventSourceRef = useRef<EventSourcePolyfill | null>(null)

  useEffect(() => {
    if (!user || !accessToken) {
      return
    }

    // 이전 연결 정리
    if (eventSourceRef.current) {
      eventSourceRef.current.close()
    }

    const eventSource = new EventSourcePolyfill(`${API_BASE_URL}/notifications/stream`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'text/event-stream',
      },
    })
    eventSourceRef.current = eventSource

    // notification 이벤트: 새 알림이 왔을 때
    eventSource.addEventListener('notification', (e) => {
      try {
        // const payload = JSON.parse((e as MessageEvent).data)
        // const notifications = Array.isArray(payload) ? payload : [payload]
        JSON.parse((e as MessageEvent).data)
        queryClient.setQueryData<{ unreadCount: number }>(['notifications', 'unreadCount'], (prev) => ({
          unreadCount: (prev?.unreadCount ?? 0) + 1,
        }))
        queryClient.invalidateQueries({ queryKey: ['notifications'] })
        // console.log(`[SSE] 새 알림 ${notifications.length}건 수신`, notifications)
      } catch (err) {
        console.error('[SSE] notification payload 파싱 오류:', err)
      }
    })

    eventSource.onerror = () => {
      // CLOSED: 연결 종료됨, CONNECTING: 재연결 시도 중 (타임아웃 후 자동 재연결)
      // 30초 타임아웃으로 인한 정상적인 재연결이므로 에러 로그 생략
    }

    // eventSource.addEventListener('connect', () => {
    //   console.log('[SSE] 연결 성공')
    // })

    return () => {
      // console.log('[SSE] 연결 종료')
      eventSource.close()
    }
  }, [user, accessToken, queryClient])
}
