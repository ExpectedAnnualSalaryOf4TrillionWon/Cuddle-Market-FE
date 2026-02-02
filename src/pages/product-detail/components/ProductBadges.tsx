import { getTradeStatus } from '@src/utils/getTradeStatus'
import { getTradeStatusColor } from '@src/utils/getTradeStatusColor'
import { getPetTypeName } from '@src/utils/getPetTypeName'
import { getCategory } from '@src/utils/getCategory'
import { getProductStatus } from '@src/utils/getProductStatus'
import { Badge } from '@src/components/commons/badge/Badge'
import { cn } from '@src/utils/cn'

interface ProductBadgesProps {
  tradeStatus: string
  petDetailType: string
  category: string
  productStatus: string
}

export default function ProductBadges({ tradeStatus, petDetailType, category, productStatus }: ProductBadgesProps) {
  const productTradeName = getTradeStatus(tradeStatus)
  const productTradeColor = getTradeStatusColor(tradeStatus)
  const petTypeName = getPetTypeName(petDetailType)
  const categoryName = getCategory(category)
  const productStatusName = getProductStatus(productStatus)

  return (
    <div className="flex items-center gap-2 md:gap-1">
      {tradeStatus && <Badge className={cn('px-2.5 py-1.5 text-sm font-semibold text-white', productTradeColor)}>{productTradeName}</Badge>}
      <Badge className={cn('bg-primary-700 px-2.5 py-1.5 text-sm font-semibold text-white')}>{petTypeName}</Badge>
      <Badge className={cn('border bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900')}>{categoryName}</Badge>
      <Badge className={cn('bg-primary-200 px-2.5 py-1.5 text-sm font-semibold')}>{productStatusName}</Badge>
    </div>
  )
}
