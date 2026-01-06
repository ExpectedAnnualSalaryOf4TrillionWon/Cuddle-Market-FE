import PlaceholderImage from '@assets/images/placeholder.png'
import { formatPrice } from '@src/utils/formatPrice'
import { Button } from '../commons/button/Button'
import AlertBox from './AlertBox'
import { PRODUCT_DELETE_ALERT_LIST, TOAST_COLORS, TOAST_ICONS } from '@src/constants/constants'
import ModalTitle from './ModalTitle'
import { useRef } from 'react'
import { useOutsideClick } from '@src/hooks/useOutsideClick'
import { Z_INDEX } from '@src/constants/ui'
import { AnimatePresence, motion } from 'framer-motion'
import ToastProgress from '../commons/ToastProgress'
import { cn } from '@src/utils/cn'
import { X } from 'lucide-react'

interface DeleteConfirmModalProps {
  isOpen: boolean
  product: { id: number; title: string; price: number; mainImageUrl: string } | null
  onConfirm: (id: number) => void
  onCancel: () => void
  error?: string | null
  onClearError?: () => void
}

function DeleteConfirmModal({ isOpen, product, onConfirm, onCancel, error, onClearError }: DeleteConfirmModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  // 바깥 클릭 시 onCancel 호출
  useOutsideClick(isOpen, [modalRef], onCancel)

  if (!isOpen || !product) return null
  const LeadingIcon = TOAST_ICONS['error']
  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-gray-900/70 ${Z_INDEX.MODAL}`}>
      <div className="flex w-11/12 flex-col gap-4 rounded-lg bg-white p-5 md:w-[16vw] md:min-w-96" ref={modalRef}>
        <ModalTitle heading="상품 삭제" description="정말로 이 상품을 삭제하시겠습니까?" />
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden rounded-lg border border-[#db202a] bg-[#fff1f1] pt-2 text-sm text-gray-900"
            >
              <div className="flex items-center gap-2 px-2 pb-2">
                <LeadingIcon className={cn('h-5 w-5 rotate-90', TOAST_COLORS['error'].icon)} />
                <div className="text-sm">{error}</div>
                <button
                  type="button"
                  aria-label="close toast"
                  onClick={() => onClearError?.()}
                  className="text-danger-500 hover:bg-danger-200 ml-auto cursor-pointer transition-colors focus:outline-none focus-visible:ring-2"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <ToastProgress trackClass="bg-danger-200" fillClass="text-danger-500" durationMs={5000} onEnd={() => onClearError?.()} />
            </motion.div>
          )}
        </AnimatePresence>
        <AlertBox alertList={PRODUCT_DELETE_ALERT_LIST} />
        <ul>
          <li className="flex gap-2.5 rounded-lg border border-gray-300 bg-gray-100/30 p-2.5">
            <div className="aspect-square w-16 shrink-0 overflow-hidden rounded-lg">
              <img
                src={product.mainImageUrl || PlaceholderImage}
                alt={product.title}
                className="h-full w-full object-cover transition-all duration-300 ease-in-out group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className="line-clamp-2 w-full font-medium md:line-clamp-none md:w-72 md:truncate">{product.title}</p>
              <p className="font-medium">
                <span>{formatPrice(Number(product.price))}</span>원
              </p>
            </div>
          </li>
        </ul>

        <div className="flex justify-end gap-3">
          <Button onClick={onCancel} size="sm" className="cursor-pointer rounded-lg border border-gray-300 bg-white">
            취소
          </Button>
          <Button onClick={() => onConfirm(product.id)} size="sm" className="bg-danger-600 cursor-pointer rounded-lg text-white">
            삭제하기
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmModal
