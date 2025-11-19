import { Input } from '@src/components/commons/Input'
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@src/utils/cn'

interface InputFieldProps {
  type: string
  placeholder?: string
  icon?: LucideIcon
  border?: boolean
  borderColor?: string
  backgroundColor?: string
  size?: string
  error?: FieldError
  classname?: string
  registration: UseFormRegisterReturn
}

export function InputField({ error, registration, classname, ...inputProps }: InputFieldProps) {
  return (
    <div className={cn('flex flex-col gap-1', classname)}>
      <Input {...inputProps} {...registration} />
      {error && <p className="text-danger-500 text-xs font-semibold">{error.message}</p>}
    </div>
  )
}
