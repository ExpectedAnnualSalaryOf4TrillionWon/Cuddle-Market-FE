import { InputField } from './InputField'
import { Button } from './button/Button'
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form'

interface InputWithButtonProps {
  id: string
  type: string
  placeholder: string
  error?: FieldError
  checkResult?: { status: string; message: string }
  registration: UseFormRegisterReturn
  buttonText: string
  buttonClassName?: string
  onButtonClick?: () => void
}

export function InputWithButton({
  id,
  type,
  placeholder,
  error,
  checkResult,
  registration,
  buttonText,
  buttonClassName = 'bg-primary-50 text-primary-500 cursor-pointer font-semibold',
  onButtonClick,
}: InputWithButtonProps) {
  return (
    <div className="flex items-start gap-4">
      <InputField
        id={id}
        type={type}
        placeholder={placeholder}
        size="text-sm"
        border
        borderColor="border-gray-400"
        error={error}
        checkResult={checkResult}
        classname="flex-1"
        registration={registration}
      />
      <Button size="md" className={buttonClassName} type="button" onClick={onButtonClick}>
        {buttonText}
      </Button>
    </div>
  )
}
