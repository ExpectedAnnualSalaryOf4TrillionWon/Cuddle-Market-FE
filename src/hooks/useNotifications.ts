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
    console.log('[SSE] useEffect 실행 - user:', !!user, 'accessToken:', !!accessToken)

    if (!user || !accessToken) {
      console.log('[SSE] 조건 불충족으로 연결 안함')
      return
    }

    // 이전 연결 정리
    if (eventSourceRef.current) {
      console.log('[SSE] 이전 연결 정리')
      eventSourceRef.current.close()
    }

    console.log('[SSE] 연결 시도:', `${API_BASE_URL}/notifications/stream`)
    const eventSource = new EventSourcePolyfill(`${API_BASE_URL}/notifications/stream`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'text/event-stream',
      },
    })
    eventSourceRef.current = eventSource

    eventSource.onopen = () => {
      console.log('[SSE] 연결 성공')
    }

    // notification 이벤트: 새 알림이 왔을 때
    eventSource.addEventListener('notification', (e) => {
      console.log('[SSE] notification 이벤트 수신:', (e as MessageEvent).data)
      try {
        const payload = JSON.parse((e as MessageEvent).data)
        console.log('[SSE] 파싱된 payload:', payload)
        queryClient.setQueryData<{ unreadCount: number }>(['notifications', 'unreadCount'], (prev) => ({
          unreadCount: (prev?.unreadCount ?? 0) + 1,
        }))
        queryClient.invalidateQueries({ queryKey: ['notifications'] })
      } catch (err) {
        console.error('[SSE] notification payload 파싱 오류:', err)
      }
    })

    // message 이벤트도 수신해보기 (서버가 다른 이벤트 타입을 사용할 수 있음)
    eventSource.onmessage = (e) => {
      console.log('[SSE] message 이벤트 수신 (기본):', e.data)
    }

    eventSource.onerror = (e) => {
      console.log('[SSE] 에러 발생:', e)
      // CLOSED: 연결 종료됨, CONNECTING: 재연결 시도 중 (타임아웃 후 자동 재연결)
    }

    return () => {
      console.log('[SSE] 연결 종료 (cleanup)')
      eventSource.close()
    }
  }, [user, accessToken, queryClient])
}
