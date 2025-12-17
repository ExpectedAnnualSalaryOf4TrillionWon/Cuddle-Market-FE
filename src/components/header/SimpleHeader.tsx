import { Link } from 'react-router-dom'
import { cn } from '@src/utils/cn'

interface SimpleHeaderProps {
  title: string
  description?: string
  to?: string
  layoutClassname?: string
}

export function SimpleHeader({ title, description, to, layoutClassname }: SimpleHeaderProps) {
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
