import { getImageSrcSet, IMAGE_SIZES, toResizedWebpUrl } from '@src/utils/imageUrl'

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
        <img
          src={toResizedWebpUrl(profileImageUrl, 150)}
          srcSet={getImageSrcSet(profileImageUrl)}
          sizes={IMAGE_SIZES.tinyThumbnail}
          alt={nickname}
          loading="lazy"
          onError={(e) => {
            const img = e.currentTarget
            if (profileImageUrl && img.src !== profileImageUrl) {
              img.srcset = ''
              img.src = profileImageUrl
            }
          }}
          className="h-full w-full object-cover"
        />
      ) : (
        <p>{nickname?.charAt(0).toUpperCase()}</p>
      )}
    </div>
  )
}
