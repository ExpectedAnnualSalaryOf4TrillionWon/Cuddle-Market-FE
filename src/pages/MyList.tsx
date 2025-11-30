import PlaceholderImage from '@assets/images/placeholder.png'
import { Badge } from '@src/components/commons/badge/Badge'
import { SelectDropdown } from '@src/components/commons/select/SelectDropdown'
import { STATUS_EN_TO_KO, type TransactionStatus, type MyPageTabId } from '@src/constants/constants'
import type { Product } from '@src/types'
import { useState } from 'react'
import { formatPrice } from '@src/utils/formatPrice'
import { Button } from '@src/components/commons/button/Button'
import { ProductMetaItem } from '@src/components/product/ProductMetaItem'
import { Eye } from 'lucide-react'
import { getTradeStatus } from '@src/utils/getTradeStatus'
import { getTradeStatusColor } from '@src/utils/getTradeStatusColor'
import { cn } from '@src/utils/cn'
import { useMutation } from '@tanstack/react-query'
import { patchProductTradeStatus } from '@src/api/products'
import { Link, useNavigate } from 'react-router-dom'
import { ROUTES } from '@src/constants/routes'

type MyListProps = Product & {
  activeTab?: MyPageTabId
  handleConfirmModal: (e: React.MouseEvent, id: number, title: string, price: number, mainImageUrl: string) => void
}
type TradeStatusKo = '판매중' | '예약중' | '거래완료'
export default function MyList({ id, title, price, mainImageUrl, tradeStatus, viewCount, activeTab, handleConfirmModal }: MyListProps) {
  const [selectedProductType, setSelectedProductType] = useState<TradeStatusKo>('판매중')
  const [localTradeStatus, setLocalTradeStatus] = useState(tradeStatus)
  const navigate = useNavigate()
  const { mutate } = useMutation({
    mutationFn: (newStatus: TransactionStatus) => patchProductTradeStatus(id, newStatus),
  })

  const handleProductType = (value: string) => {
    const koToEn = STATUS_EN_TO_KO.find((status) => status.name === value)?.value
    setSelectedProductType(value as TradeStatusKo)
    setLocalTradeStatus(koToEn as TransactionStatus)
    mutate(koToEn as TransactionStatus)
  }

  const productTradeStatusCompleted = () => {
    setLocalTradeStatus('COMPLETED')
    mutate('COMPLETED')
  }

  const handleProductUpdate = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    navigate(`/products/${id}/edit`)
  }
  const baseTradeStatus = getTradeStatus(localTradeStatus)
  // 판매요청 탭에서는 "판매완료" → "구매완료"로 표시
  const trade_status = activeTab === 'tab-purchases' && baseTradeStatus === '판매완료' ? '구매완료' : baseTradeStatus
  const productTradeColor = getTradeStatusColor(localTradeStatus)

  const isCompleted = localTradeStatus === 'COMPLETED'
  const isSalesTab = activeTab === 'tab-sales'
  const isPurchasesTab = activeTab === 'tab-purchases'

  return (
    <li id={id.toString()} className="w-full">
      <Link to={ROUTES.DETAIL_ID(id)} className="flex w-full items-center justify-center gap-6 rounded-lg border border-gray-300 p-3.5">
        <div className="aspect-square w-32 shrink-0 overflow-hidden rounded-lg">
          <img
            src={mainImageUrl || PlaceholderImage}
            alt={title}
            className="h-full w-full object-cover transition-all duration-300 ease-in-out group-hover:scale-105"
          />
        </div>
        <div className="flex flex-1">
          <div className="flex h-fit flex-1 flex-col items-start gap-2">
            {trade_status && <Badge className={cn('bg-[#48BB78] text-white', productTradeColor)}>{trade_status}</Badge>}
            <div className="flex w-full items-start justify-between">
              <div className="flex flex-col gap-1">
                <h3 className="heading-h5 w-96 truncate">{title}</h3>
                <span className="font-medium text-gray-500">{formatPrice(price)} 원</span>
              </div>
            </div>
            <div>
              <ProductMetaItem icon={Eye} label={`조회 ${viewCount}`} className="text-sm text-gray-400" />
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            {!isCompleted && isSalesTab && (
              <div className="w-32">
                <SelectDropdown
                  value={selectedProductType}
                  onChange={handleProductType}
                  options={STATUS_EN_TO_KO.map((sort) => ({
                    value: sort.name,
                    label: sort.name,
                  }))}
                  buttonClassName="border-primary-50 border bg-primary-50 text-gray-900 px-3 py-2"
                />
              </div>
            )}
            {!isCompleted && isPurchasesTab && (
              <Button
                size="sm"
                className="h-fit w-32 flex-1 cursor-pointer border border-gray-300 hover:bg-gray-300"
                onClick={productTradeStatusCompleted}
              >
                구매완료
              </Button>
            )}
            <div className="flex w-full min-w-32 gap-1">
              {!isCompleted && (
                <Button
                  size="sm"
                  className="hover:bg-primary-300 flex-1 cursor-pointer border border-gray-300 hover:font-bold hover:text-white"
                  onClick={handleProductUpdate}
                >
                  수정
                </Button>
              )}
              <Button
                size="sm"
                className="hover:bg-primary-300 flex-1 cursor-pointer border border-gray-300 hover:font-bold hover:text-white"
                onClick={(e: React.MouseEvent) => handleConfirmModal(e, id, title, price, mainImageUrl)}
              >
                삭제
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </li>
  )
}
