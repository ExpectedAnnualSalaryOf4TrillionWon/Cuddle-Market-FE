import type { SignUpFormValues } from './SignUpForm'
import { type Control, Controller, type UseFormWatch, type UseFormSetValue } from 'react-hook-form'
import { CITIES, PROVINCES } from '@src/constants/cities'
import { CustomSelect } from '../../../components/commons/CustomSelect'
import { RequiredLabel } from '@src/components/commons/RequiredLabel'
import { signupValidationRules } from '../validationRules'
import { useEffect } from 'react'
interface AddressFieldProps {
  watch: UseFormWatch<SignUpFormValues>
  control: Control<SignUpFormValues>
  setValue: UseFormSetValue<SignUpFormValues>
}

export function AddressField({ control, watch, setValue }: AddressFieldProps) {
  const selectedSido = watch('addressSido')
  const availableGugun = selectedSido ? CITIES[selectedSido] || [] : []

  // 시/도가 변경되면 시/군/구 초기화
  useEffect(() => {
    if (selectedSido) {
      setValue('addressGugun', '')
    }
  }, [selectedSido, setValue])
  return (
    <div className="flex flex-col gap-2.5">
      <RequiredLabel htmlFor="signup-address-sido">거주지</RequiredLabel>
      <div className="flex gap-2.5">
        <Controller
          name="addressSido"
          control={control}
          rules={signupValidationRules.addressSido}
          render={({ field, fieldState }) => (
            <div className="flex flex-1 flex-col gap-1">
              <CustomSelect
                {...field}
                options={PROVINCES.map((province) => ({
                  value: province,
                  label: province,
                }))}
                placeholder="시/도를 선택해주세요"
                id="signup-address-sido"
              />
              {fieldState.error && <p className="text-xs font-semibold text-red-500">{fieldState.error.message}</p>}
            </div>
          )}
        />
        <Controller
          name="addressGugun"
          control={control}
          rules={signupValidationRules.addressGugun}
          render={({ field, fieldState }) => (
            <div className="flex flex-1 flex-col gap-1">
              <CustomSelect
                {...field}
                options={availableGugun.map((gugun) => ({
                  value: gugun,
                  label: gugun,
                }))}
                placeholder={selectedSido ? '구/군을 선택해주세요' : '먼저 시/도를 선택해주세요'}
                disabled={!selectedSido}
                id="signup-address-gugun"
              />
              {fieldState.error && <p className="text-xs font-semibold text-red-500">{fieldState.error.message}</p>}
            </div>
          )}
        />
      </div>
    </div>
  )
}
