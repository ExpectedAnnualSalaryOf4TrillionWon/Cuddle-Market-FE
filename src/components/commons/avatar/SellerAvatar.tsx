interface SellerAvatarProps {
  profileImageUrl?: string | null
  nickname?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
}

export function SellerAvatar({ profileImageUrl, nickname, size = 'md' }: SellerAvatarProps) {
  return (
    <div className={`bg-primary-50 flex items-center justify-center overflow-hidden rounded-full ${sizeClasses[size]}`}>
      {profileImageUrl ? (
        <img src={profileImageUrl} alt={nickname} className="h-full w-full object-cover" />
      ) : (
        <p>{nickname?.charAt(0).toUpperCase()}</p>
      )}
    </div>
  )
}
