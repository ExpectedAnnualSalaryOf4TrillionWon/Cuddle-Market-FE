import { Button } from '../commons/button/Button'
import AlertBox from './AlertBox'
import { USER_BLOCK_ALERT_LIST } from '@src/constants/constants'
import ModalTitle from './ModalTitle'
import { userBlocked } from '@src/api/profile'
import { useQueryClient } from '@tanstack/react-query'
import { useRef } from 'react'
import { useOutsideClick } from '@src/hooks/useOutsideClick'
import { Z_INDEX } from '@src/constants/ui'

interface BlockModalProps {
  isOpen: boolean
  userNickname: string
  userId: number
  onCancel: () => void
}

export default function BlockModal({ isOpen, onCancel, userNickname, userId }: BlockModalProps) {
  const queryClient = useQueryClient()
  const handleCancel = () => {
    onCancel()
  }
  const modalRef = useRef<HTMLDivElement>(null)
  // 바깥 클릭 시 onCancel 호출
  useOutsideClick(isOpen, [modalRef], onCancel)
  const onUserBlock = async () => {
    try {
      await userBlocked(userId)
      queryClient.invalidateQueries({ queryKey: ['userPage'] })
      onCancel()
    } catch (error) {
      console.error('사용자 차단 실패:', error)
    }
  }
  if (!isOpen) return null
  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-gray-900/70 ${Z_INDEX.MODAL}`}>
      <div ref={modalRef} className="flex w-11/12 flex-col gap-4 rounded-lg bg-white p-5 md:w-[16vw] md:min-w-max">
        <ModalTitle heading="사용자 차단하기" description={`정말로 ${userNickname}를 신고하시겠습니까?`} />
        <AlertBox alertList={USER_BLOCK_ALERT_LIST} />

        <div className="flex justify-end gap-3">
          <Button type="button" onClick={handleCancel} size="sm" className="cursor-pointer rounded-lg border border-gray-300 bg-white">
            취소
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={onUserBlock}
            className="bg-danger-600 cursor-pointer rounded-lg text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            차단하기
          </Button>
        </div>
      </div>
    </div>
  )
}
