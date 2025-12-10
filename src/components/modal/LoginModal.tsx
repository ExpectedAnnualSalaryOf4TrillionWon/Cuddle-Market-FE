import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@src/components/commons/button/Button'
import { ROUTES } from '@src/constants/routes'
interface LoginModalProps {
  isOpen: boolean
  onCancel: () => void
}

export default function LoginModal({ isOpen, onCancel }: LoginModalProps) {
  const handleCancel = () => {
    onCancel()
  }
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-gray-900/70">
      <div className="flex w-[10vw] flex-col items-center gap-6 rounded-lg bg-white p-5">
        <div className="flex w-full flex-col items-center gap-2">
          <h3 className="heading-h4">로그인이 필요합니다</h3>
          <p>로그인 하시겠습니까?</p>
        </div>
        <div className="flex w-full gap-3">
          <Button size="md" className="flex-1 cursor-pointer border border-gray-300" onClick={handleCancel}>
            취소
          </Button>
          <Link to={ROUTES.LOGIN} className="bg-primary-300 flex flex-1 items-center justify-center rounded-lg px-4 py-2.5 text-white">
            로그인
          </Link>
        </div>
      </div>
    </div>
  )
}
