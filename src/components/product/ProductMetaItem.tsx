import type { LucideIcon } from 'lucide-react'

interface ProductMetaItemProps {
  icon: LucideIcon
  label: string | number
  className?: string // 색상 커스터마이징
}

export function ProductMetaItem({ icon: Icon, label, className = 'text-gray-500' }: ProductMetaItemProps) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <Icon size={16} aria-hidden="true" />
      <span className="font-medium">{label}</span>
    </div>
  )
}
