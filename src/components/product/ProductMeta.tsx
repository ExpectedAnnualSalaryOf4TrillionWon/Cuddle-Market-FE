import { Clock, Heart } from 'lucide-react'

const getTimeAgo = (createdAt: string): string => {
  const now = new Date()
  const created = new Date(createdAt)
  const diffMs = now.getTime() - created.getTime()

  const diffMinutes = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMinutes / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMinutes < 1) return '방금 전'
  if (diffMinutes < 60) return `${diffMinutes}분 전`
  if (diffHours < 24) return `${diffHours}시간 전`
  return `${diffDays}일 전`
}

interface ProductMetaProps {
  createdAt: string
  favoriteCount: number
}

export function ProductMeta({ createdAt, favoriteCount }: ProductMetaProps) {
  return (
    <div className="flex w-full justify-between">
      <div className="flex items-center gap-1 text-gray-400">
        <Clock size={16} aria-hidden="true" />
        <span>{getTimeAgo(createdAt)}</span>
      </div>
      <div className="flex items-center gap-1 text-gray-400">
        <span>{favoriteCount}</span>
        <Heart size={16} />
      </div>
    </div>
  )
}
