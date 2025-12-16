import { Link, useNavigate } from 'react-router-dom'
import { cn } from '@src/utils/cn'
import { useMediaQuery } from '@src/hooks/useMediaQuery'
import { ROUTES } from '@src/constants/routes'
import { useUserStore } from '@src/store/userStore'

interface SimpleHeaderProps {
  title: string
  description?: string
  to?: string
  layoutClassname?: string
  showWriteButton?: boolean
}

export function SimpleHeader({ title, description, to, layoutClassname, showWriteButton = true }: SimpleHeaderProps) {
  const isMd = useMediaQuery('(min-width: 768px)')
  const { isLogin } = useUserStore()

  return (
    <div className={cn('mx-auto flex max-w-7xl flex-col gap-2 bg-white px-3.5 py-2.5', layoutClassname)}>
      {to ? (
        <Link to={to} className="heading-h2 hover:text-primary-200 w-fit cursor-pointer transition-all">
          {title}
        </Link>
      ) : (
        <h2 className="heading-h2">{title}</h2>
      )}
      {description && <p>{description}</p>}
    </div>
  )
}
