import { InputField } from '@src/components/commons/InputField'
import { RequiredLabel } from '@src/components/commons/RequiredLabel'
// import type { SignUpFormValues } from './SignUpForm'
import { type UseFormRegister, type FieldErrors } from 'react-hook-form'
import { productPostValidationRules } from '@src/pages/signup/validationRules'
import type { ProductPostFormValues } from '../../ProductPostForm'

interface ProductNameFieldProps {
  register: UseFormRegister<ProductPostFormValues>
  errors: FieldErrors<ProductPostFormValues>
  label?: string
  titleLength?: number
}

export function ProductNameField({ register, errors, label = '상품명', titleLength = 0 }: ProductNameFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <RequiredLabel htmlFor="product-title" labelClass="heading-h5">
        {label}
      </RequiredLabel>
      <InputField
        id="product-title"
        type="text"
        placeholder="예: 강아지 사료 10kg 상품"
        size="text-sm"
        border
        borderColor="border-gray-400"
        classname="flex flex-col gap-2.5"
        error={errors.title}
        registration={register('title', productPostValidationRules.name)}
      />
      <p>{titleLength}/50자</p>
    </div>
  )
}
