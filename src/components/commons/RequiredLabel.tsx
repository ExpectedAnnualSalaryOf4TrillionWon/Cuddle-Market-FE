import { cn } from '@src/utils/cn'

interface RequiredLabelProps {
  htmlFor?: string
  children: string
  labelClass?: string
}

export function RequiredLabel({ htmlFor, children, labelClass }: RequiredLabelProps) {
  return (
    <label htmlFor={htmlFor} className={cn('text-gray-900', labelClass)}>
      <span>{children}</span>
      <span className="text-danger-500">*</span>
    </label>
  )
}
