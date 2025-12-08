import { Link } from 'react-router-dom'
import PlaceholderImage from '@assets/images/placeholder.png'
import { Badge } from '@src/components/commons/badge/Badge'
import { ProductMetaItem } from './ProductMetaItem'
import { ROUTES } from '@src/constants/routes'
import { formatPrice } from '@src/utils/formatPrice'
import { getTradeStatus } from '@src/utils/getTradeStatus'
import { getTradeStatusColor } from '@src/utils/getTradeStatusColor'
import { cn } from '@src/utils/cn'
import { Eye } from 'lucide-react'
import type { Product } from '@src/types'

interface ProductListItemProps {
  product: Product
  children?: React.ReactNode
}

export function ProductListItem({ product, children }: ProductListItemProps) {
  const { id, title, price, mainImageUrl, tradeStatus, viewCount } = product
  const tradeStatusText = getTradeStatus(tradeStatus)
  const tradeStatusColor = getTradeStatusColor(tradeStatus)

  return (
    <li id={id.toString()} className="w-full">
      <Link to={ROUTES.DETAIL_ID(id)} className="flex w-full items-center justify-center gap-6 rounded-lg border border-gray-300 p-3.5">
        <div className="aspect-square w-[10%] shrink-0 overflow-hidden rounded-lg">
          <img
            src={mainImageUrl || PlaceholderImage}
            alt={title}
            className="h-full w-full object-cover transition-all duration-300 ease-in-out group-hover:scale-105"
          />
        </div>
        <div className="flex flex-1 items-start">
          <div className="flex h-fit flex-1 flex-col items-start gap-2">
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
          {children ? children : tradeStatus && <Badge className={cn('bg-[#48BB78] text-white', tradeStatusColor)}>{tradeStatusText}</Badge>}
        </div>
      </Link>
    </li>
  )
}
