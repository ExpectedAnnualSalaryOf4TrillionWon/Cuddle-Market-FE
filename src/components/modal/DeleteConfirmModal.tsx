import PlaceholderImage from '@assets/images/placeholder.png'
import { TriangleAlert } from 'lucide-react'
import { formatPrice } from '@src/utils/formatPrice'
import { Button } from '../commons/button/Button'
import AlertBox from './AlertBox'
import { PRODUCT_DELETE_ALERT_LIST } from '@src/constants/constants'
import ModalTitle from './ModalTitle'

interface DeleteConfirmModalProps {
  isOpen: boolean
  product: { id: number; title: string; price: number; mainImageUrl: string } | null
  onConfirm: (id: number) => void
  onCancel: () => void
}

function DeleteConfirmModal({ isOpen, product, onConfirm, onCancel }: DeleteConfirmModalProps) {
  if (!isOpen || !product) return null

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-gray-900/70">
      <div className="flex w-[16vw] flex-col gap-4 rounded-lg bg-white p-5">
        <ModalTitle heading="상품 삭제" description="정말로 이 상품을 삭제하시겠습니까?" />
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
              <p className="w-72 truncate font-medium">{product.title}</p>
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
