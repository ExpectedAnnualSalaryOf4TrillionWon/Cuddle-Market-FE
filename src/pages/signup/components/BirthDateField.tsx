import { RequiredLabel } from '@src/components/commons/RequiredLabel'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './BirthDateField.css'
import { forwardRef } from 'react'
import { Controller, type Control } from 'react-hook-form'
import { Calendar, ChevronLeft as LeftArrow } from 'lucide-react'
import { ko } from 'date-fns/locale'
import type { SignUpFormValues } from './SignUpForm'
import { Button } from '@src/components/commons/button/Button'

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

const renderCustomHeader = ({
  date,
  changeYear,
  changeMonth,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}: {
  date: Date
  changeYear: (year: number) => void
  changeMonth: (month: number) => void
  decreaseMonth: () => void
  increaseMonth: () => void
  prevMonthButtonDisabled: boolean
  nextMonthButtonDisabled: boolean
}) => {
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i)
  const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']

  return (
    <div className="flex items-center justify-between gap-2 px-2 py-2">
      <Button
        type="button"
        icon={LeftArrow}
        size="xs"
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
        className="h-8 w-8 rounded hover:bg-gray-100"
      />
      <div className="flex gap-2">
        <select value={date.getFullYear()} onChange={({ target: { value } }) => changeYear(Number(value))} className="py-1 text-sm">
          {years.map((year) => (
            <option key={year} value={year}>
              {year}년
            </option>
          ))}
        </select>

        <select value={date.getMonth()} onChange={({ target: { value } }) => changeMonth(Number(value))} className="py-1 text-sm">
          {months.map((month, index) => (
            <option key={month} value={index}>
              {month}
            </option>
          ))}
        </select>
      </div>
      <Button
        type="button"
        icon={LeftArrow}
        size="xs"
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
        className="h-8 w-8 rotate-180 rounded hover:bg-gray-100"
      />
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
          rules={{
            required: '생년월일을 입력해주세요',
            validate: (value) => {
              const birthDate = new Date(value)
              const today = new Date()
              const age = today.getFullYear() - birthDate.getFullYear()
              // 생일이 아직 안 지났으면 나이 -1
              const isBeforeBirthday =
                today.getMonth() < birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
              const actualAge = isBeforeBirthday ? age - 1 : age

              return actualAge >= 14 || '만 14세 이상만 가입 가능합니다'
            },
          }}
          render={({ field, fieldState }) => (
            <div className="flex flex-col gap-1">
              <DatePicker
                dateFormat="yyyy-MM-dd"
                maxDate={new Date()}
                shouldCloseOnSelect
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
              {fieldState.error && <p className="text-danger-500 text-xs font-semibold">{fieldState.error.message}</p>}
            </div>
          )}
        />
      </div>
    </div>
  )
}
