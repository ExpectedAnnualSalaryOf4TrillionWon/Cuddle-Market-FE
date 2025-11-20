import { RequiredLabel } from '@src/components/commons/RequiredLabel'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './BirthDateField.css'
import { forwardRef } from 'react'
import { Controller, type Control } from 'react-hook-form'
import { ChevronLeft as LeftArrow, Calendar } from 'lucide-react'
import { ko } from 'date-fns/locale'
import type { SignUpFormValues } from './SignUpForm'

interface CustomInputProps {
  className?: string
  value?: string
  onClick?: () => void
  placeholder: string
}

interface BirthDateFieldProps {
  control: Control<SignUpFormValues>
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(({ value, onClick, placeholder }, ref) => {
  const hasValue = value && value.trim() !== ''

  return (
    <div className="relative" onClick={onClick}>
      <input
        type="text"
        value={hasValue ? value : ''}
        placeholder={placeholder}
        readOnly
        ref={ref}
        className="focus:border-primary-500 flex h-full w-full cursor-pointer rounded-lg border border-gray-400 px-3 py-3 text-sm placeholder:text-gray-400 focus:outline-none"
      />
      <div className="absolute top-0 right-0 flex h-full w-9 items-center justify-center">
        <Calendar className="h-5 w-5 text-gray-400" strokeWidth={2} />
      </div>
    </div>
  )
})

CustomInput.displayName = 'CustomInput'

const renderCustomHeader = ({ date, decreaseMonth }: { date: Date; decreaseMonth: () => void; increaseMonth: () => void }) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1

  return (
    <div className="flex items-center justify-between">
      <button type="button" onClick={decreaseMonth} className="flex h-8 w-8 items-center justify-center rounded hover:bg-gray-100">
        <LeftArrow className="h-6 w-6 text-gray-400" strokeWidth={2} />
      </button>
      <div className="text-base font-bold text-gray-900">
        {year}년 {month}월
      </div>
      <div className="h-8 w-8" />
    </div>
  )
}

export function BirthDateField({ control }: BirthDateFieldProps) {
  return (
    <div className="flex flex-col gap-2.5">
      <RequiredLabel htmlFor="signup-birthdate">생년월일</RequiredLabel>
      <div>
        <Controller
          name="birthDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              dateFormat="yyyy-MM-dd"
              shouldCloseOnSelect
              maxDate={new Date()}
              selected={field.value && field.value !== '' ? new Date(field.value) : null}
              onChange={(date) => {
                // Date 객체를 'yyyy-MM-dd' 문자열로 변환
                const formatted = date ? date.toISOString().split('T')[0] : ''
                field.onChange(formatted)
              }}
              popperPlacement="bottom-start"
              locale={ko}
              placeholderText="YYYY-MM-DD"
              customInput={<CustomInput className="example-custom-input" placeholder="YYYY-MM-DD" />}
              renderCustomHeader={renderCustomHeader}
            />
          )}
        />
      </div>
    </div>
  )
}
