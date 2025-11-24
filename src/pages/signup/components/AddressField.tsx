import { useEffect } from 'react'
import { Controller, type Control, type UseFormWatch, type UseFormSetValue } from 'react-hook-form'
import { CITIES, PROVINCES } from '@src/constants/cities'
import { SelectDropdown } from '../../../components/commons/select/SelectDropdown'
import { RequiredLabel } from '../../../components/commons/RequiredLabel'
import type { SignUpFormValues } from './SignUpForm'

interface AddressFieldProps {
  control: Control<SignUpFormValues>
  watch: UseFormWatch<SignUpFormValues>
  setValue: UseFormSetValue<SignUpFormValues>
}

export function AddressField({ control, watch, setValue }: AddressFieldProps) {
  const selectedSido = watch('addressSido')
  const availableGugun = selectedSido ? CITIES[selectedSido] || [] : []

  // 시/도가 변경되면 구/군 초기화
  useEffect(() => {
    if (selectedSido) {
      setValue('addressGugun', '')
    }
  }, [selectedSido, setValue])

  return (
    <div className="flex flex-col gap-2.5">
      <RequiredLabel htmlFor="address-sido">거주지</RequiredLabel>

      <div className="flex gap-2.5">
        {/* 시/도 선택 */}
        <Controller
          name="addressSido"
          control={control}
          rules={{ required: '시/도를 선택해주세요' }}
          render={({ field, fieldState }) => (
            <div className="flex flex-1 flex-col gap-1">
              <SelectDropdown
                {...field}
                options={PROVINCES.map((province) => ({
                  value: province,
                  label: province,
                }))}
                placeholder="시/도를 선택해주세요"
                id="address-sido"
              />
              {fieldState.error && <p className="text-xs font-semibold text-red-500">{fieldState.error.message}</p>}
            </div>
          )}
        />

        {/* 시/군/구 선택 */}
        <Controller
          name="addressGugun"
          control={control}
          rules={{ required: '구/군을 선택해주세요' }}
          render={({ field, fieldState }) => (
            <div className="flex flex-1 flex-col gap-1">
              <SelectDropdown
                {...field}
                options={availableGugun.map((gugun) => ({
                  value: gugun,
                  label: gugun,
                }))}
                placeholder={selectedSido ? '시/군/구 를 선택해주세요' : '먼저 시/도를 선택해주세요'}
                disabled={!selectedSido}
                id="address-gugun"
              />
              {fieldState.error && <p className="text-xs font-semibold text-red-500">{fieldState.error.message}</p>}
            </div>
          )}
        />
      </div>
    </div>
  )
}
