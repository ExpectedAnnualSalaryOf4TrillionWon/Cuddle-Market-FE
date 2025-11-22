import { Badge } from '../commons/badge/Badge'

interface ProductBadgeProps {
  petTypeName: string
  productStatusName: string
}

export function ProductBadge({ petTypeName, productStatusName }: ProductBadgeProps) {
  return (
    <div className="gap-xs z-1 flex">
      <Badge className="bg-primary-700 text-white">{petTypeName}</Badge>
      <Badge className="bg-primary-200 text-gray-900">{productStatusName}</Badge>
    </div>
  )
}
