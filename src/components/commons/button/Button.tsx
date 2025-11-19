import { cn } from '@src/utils/cn'
import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { buttonVariants, iconSizeMap, type ButtonVariants } from './buttonClass'

interface ButtonProps extends ButtonVariants {
  children?: ReactNode
  icon?: LucideIcon
  iconSrc?: string
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
  className?: string
}

export function Button({ children, icon: Icon, iconSrc, size = 'md', disabled = false, type = 'button', onClick, className }: ButtonProps) {
  // 아이콘 위치 결정
  const iconPosition = (Icon || iconSrc) && !children ? 'only' : (Icon || iconSrc) && children ? 'left' : 'none'

  // 아이콘 사이즈 가져오기
  const iconSize = size && Icon ? iconSizeMap[size] : undefined

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled ?? false}
      className={cn(buttonVariants({ size, iconPosition, disabled: disabled || undefined }), className)}
    >
      {Icon && <Icon size={iconSize} />}
      {iconSrc && <img src={iconSrc} alt="" className="h-4 w-4 object-contain" />}
      {children}
    </button>
  )
}
