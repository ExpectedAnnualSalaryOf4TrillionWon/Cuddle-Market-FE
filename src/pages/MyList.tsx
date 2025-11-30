import PlaceholderImage from '@assets/images/placeholder.png'
import { Badge } from '@src/components/commons/badge/Badge'
import { SelectDropdown } from '@src/components/commons/select/SelectDropdown'
import { STATUS_EN_TO_KO } from '@src/constants/constants'
import type { Product } from '@src/types'
import { useState } from 'react'
import { formatPrice } from '@src/utils/formatPrice'
import { Button } from '@src/components/commons/button/Button'
import { ProductMetaItem } from '@src/components/product/ProductMetaItem'
import { Clock, Heart, MapPin, Eye } from 'lucide-react'
import { getTradeStatus } from '@src/utils/getTradeStatus'
import { getTradeStatusColor } from '@src/utils/getTradeStatusColor'
import { cn } from '@src/utils/cn'

type MyListProps = Product

export default function MyList({ id, title, price, mainImageUrl, tradeStatus, viewCount }: MyListProps) {
  const [selectedProductType, setSelectedProductType] = useState('판매중')

  const handleProductType = (value: string) => {
    setSelectedProductType(value)
  }
  const trade_status = getTradeStatus(tradeStatus)
  const productTradeColor = getTradeStatusColor(tradeStatus)

  return (
    <li id={id.toString()} className="flex w-full items-center justify-center gap-6 rounded-lg border border-gray-300 p-3.5">
      <div className="aspect-square w-32 shrink-0 overflow-hidden rounded-lg">
        <img
          src={mainImageUrl || PlaceholderImage}
          alt={title}
          className="h-full w-full object-cover transition-all duration-300 ease-in-out group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col items-start gap-2">
        <Badge className={cn('bg-[#48BB78] text-white', productTradeColor)}>{trade_status}</Badge>
        <div className="flex w-full items-start justify-between">
          <div className="flex flex-col gap-1">
            <h3 className="heading-h5 w-96 truncate">{title}</h3>
            <span className="font-medium text-gray-500">{formatPrice(price)} 원</span>
          </div>
          <div className="flex gap-1">
            <div className="w-32">
              <SelectDropdown
                value={selectedProductType}
                onChange={handleProductType}
                options={STATUS_EN_TO_KO.map((sort) => ({
                  value: sort.name,
                  label: sort.name,
                }))}
                buttonClassName="border-0 bg-primary-50 text-gray-900 px-3 py-2"
              />
            </div>
            <Button size="sm" className="border border-gray-300">
              수정
            </Button>
            <Button size="sm" className="border border-gray-300">
              삭제
            </Button>
          </div>
        </div>
        <div>
          <ProductMetaItem icon={Eye} label={`조회 ${viewCount}`} className="text-sm text-gray-400" />
        </div>
      </div>
    </li>
  )
}
