import { cn } from '@src/utils/cn'

interface ProfileAvatarProps {
  imageUrl?: string | null
  nickname: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeClasses = {
  sm: 'h-8 w-8 text-sm',
  md: 'h-10 w-10 text-base',
  lg: 'h-12 w-12 text-lg',
}

export function ProfileAvatar({ imageUrl, nickname, size = 'md', className }: ProfileAvatarProps) {
  return (
    <div className={cn('bg-primary-50 flex items-center justify-center overflow-hidden rounded-full', sizeClasses[size], className)}>
      {imageUrl ? <img src={imageUrl} alt={nickname} className="h-full w-full object-cover" /> : <span>{nickname.charAt(0).toUpperCase()}</span>}
    </div>
  )
}
