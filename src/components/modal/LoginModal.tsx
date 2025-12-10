import { Link } from 'react-router-dom'
import { Button } from '@src/components/commons/button/Button'
import { ROUTES } from '@src/constants/routes'
import { useLoginModalStore } from '@src/store/modalStore'

export default function ConfirmModal() {
  const { isOpen, modalType, onConfirm, closeModal } = useLoginModalStore()

  if (!isOpen) return null

  // 모달 타입에 따른 텍스트 설정
  const isLogin = modalType === 'login'
  const heading = isLogin ? '로그인이 필요합니다' : '로그아웃'
  const description = isLogin ? '로그인 하시겠습니까?' : '정말로 로그아웃 하시겠습니까?'
  const confirmText = isLogin ? '로그인' : '로그아웃'

  // 확인 버튼 클릭 핸들러
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm()
    }
    closeModal()
  }

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-gray-900/70">
      <div className="flex min-w-80 flex-col items-center gap-6 rounded-lg bg-white p-5">
        <div className="flex w-full flex-col items-center gap-2">
          <h3 className="heading-h4">{heading}</h3>
          <p>{description}</p>
        </div>
        <div className="flex w-full gap-3">
          <Button size="md" className="flex-1 cursor-pointer border border-gray-300" onClick={closeModal}>
            취소
          </Button>
          {isLogin ? (
            <Link
              to={ROUTES.LOGIN}
              className="bg-primary-300 flex flex-1 items-center justify-center rounded-lg px-4 py-2.5 text-white"
              onClick={closeModal}
            >
              {confirmText}
            </Link>
          ) : (
            <Button size="md" className="bg-primary-300 flex-1 cursor-pointer text-white" onClick={handleConfirm}>
              {confirmText}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
