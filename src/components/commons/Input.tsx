import { cn } from '@src/utils/cn'
import type { LucideIcon } from 'lucide-react'

interface InputProps {
  type: string
  placeholder?: string
  icon?: LucideIcon
  border?: boolean
  borderColor?: string
  backgroundColor?: string
  value?: string
  size?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function Input({
  type,
  placeholder,
  icon: Icon,
  border = false,
  borderColor = 'border-gray-100',
  backgroundColor = 'bg-white',
  value,
  size = 'text-base',
  onChange,
}: InputProps) {
  return (
    <div
      className={cn(
        'relative flex w-full h-full items-center overflow-hidden rounded-lg transition-colors',
        border && 'focus-within:border-primary-500 border',
        border && borderColor,
        backgroundColor,
        Icon && 'pl-9'
      )}
    >
      {Icon && (
        <div className="absolute left-0 flex h-full w-9 items-center justify-center">
          <Icon className="h-4 w-4 text-gray-400" strokeWidth={1.3} />
        </div>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-label={placeholder}
        className={cn(
          'w-full py-[13px] placeholder:text-gray-400 focus:border-transparent focus:outline-none',
          backgroundColor,
          Icon ? 'pl-0' : 'px-3',
          size
        )}
      />
    </div>
  )
}
