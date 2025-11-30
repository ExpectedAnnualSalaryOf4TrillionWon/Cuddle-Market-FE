// import { useModalStore } from '@store/modalStore';
import PlaceholderImage from '@assets/images/placeholder.png'
import { TriangleAlert } from 'lucide-react'
import { formatPrice } from '@src/utils/formatPrice'
import { Button } from '../commons/button/Button'
interface ConfirmModalProps {
  isOpen: boolean
  product?: { id: number; title: string; price: number; mainImageUrl: string } | null
  type: string
  heading: string
  description: string
  subMessage?: string
  onConfirm: (id: number | undefined) => void
  onCancel: () => void
}

function ConfirmModal({ isOpen, product, type, heading, description, onConfirm, onCancel }: ConfirmModalProps) {
  const TAB_CONFIG: {
    [key: string]: {
      heading: string
      description: string
      subDescription: string[]
      emptyDescription?: string
      buttonLabel?: string
      navigateTo?: string
    }
  } = {
    delete: {
      heading: '상품 삭제',
      description: '정말로 이 상품을 삭제하시겠습니까?',
      subDescription: ['삭제된 상품은 복구할 수 없습니다'],
      emptyDescription: '상품을 등록해보세요',
      buttonLabel: '삭제하기',
    },
    // 'tab-purchases': {
    //   heading: '내가 등록한 상품',
    //   description: '개의 상품을 등록했습니다',
    //   emptyDescription: '구매 요청을 등록해보세요',
    //   buttonLabel: '판매요청 등록',
    //   navigateTo: '/product-post?tab=tab-purchases',
    // },
    // 'tab-wishlist': {
    //   heading: '내가 찜한 상품',
    //   description: '개의 상품을 찜했습니다',
    //   emptyDescription: '마음에 드는 상품을 찜해보세요',
    // },
  }

  const config = TAB_CONFIG[type]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-gray-900/70">
      <div className="flex flex-col gap-4 rounded-lg bg-white p-5">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <TriangleAlert className="text-danger-600" />
            <p className="heading-h5">{heading}</p>
          </div>
          <p>{description}</p>
        </div>
        <div className="bg-danger-100/30 border-danger-100 flex flex-col gap-1 rounded-lg border p-2.5">
          <div className="flex items-center gap-2">
            <TriangleAlert className="text-danger-800" size={20} />
            <p className="text-danger-800 font-medium">주의사항</p>
          </div>
          {config.subDescription.map((desc, i) => (
            <p key={i} className="text-danger-600">
              • {desc}
            </p>
          ))}
        </div>
        <ul>
          <li className="flex gap-2.5 rounded-lg border border-gray-300 bg-gray-100/30 p-2.5">
            <div className="aspect-square w-16 shrink-0 overflow-hidden rounded-lg">
              <img
                src={product?.mainImageUrl || PlaceholderImage}
                alt=""
                className="h-full w-full object-cover transition-all duration-300 ease-in-out group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className="w-96 truncate font-medium">{product?.title}</p>
              <p className="font-medium">
                <span>{formatPrice(Number(product?.price))}</span>원
              </p>
            </div>
          </li>
        </ul>
        <div className="flex justify-end gap-3">
          <Button onClick={onCancel} size="sm" className="cursor-pointer rounded-lg border border-gray-300 bg-white">
            취소
          </Button>
          <Button onClick={() => onConfirm(product?.id)} size="sm" className="bg-danger-600 cursor-pointer rounded-lg text-white">
            {config.buttonLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
