import { cn } from '@src/utils/cn'
import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { buttonVariants, iconSizeMap, type ButtonVariants } from './buttonClass'

interface ButtonProps extends Omit<React.ComponentPropsWithoutRef<'button'>, 'disabled'>, ButtonVariants {
  children?: ReactNode
  icon?: LucideIcon
  iconSrc?: string
  disabled?: boolean
  iconProps?: React.ComponentProps<LucideIcon>
}

export function Button({
  children,
  icon: Icon,
  iconSrc,
  size = 'md',
  disabled = false,
  type = 'button',
  className,
  iconProps,
  ...rest
}: ButtonProps) {
  // 아이콘 위치 결정
  const iconPosition = (Icon || iconSrc) && !children ? 'only' : (Icon || iconSrc) && children ? 'left' : 'none'
  // 아이콘 사이즈 가져오기
  const iconSize = size && Icon ? iconSizeMap[size] : undefined

  return (
    <button
      type={type}
      disabled={disabled ?? false}
      className={cn(buttonVariants({ size, iconPosition, disabled: disabled || undefined }), className)}
      {...rest}
    >
      {Icon && <Icon size={iconSize} {...iconProps} />}
      {iconSrc && <img src={iconSrc} alt="" className="h-4 w-4 object-contain" />}
      {children}
    </button>
  )
}
