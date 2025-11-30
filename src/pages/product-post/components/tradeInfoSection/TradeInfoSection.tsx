import { AddressField } from '@src/components/commons/AddressField'
import type { ProductPostFormValues } from '../ProductPostForm'
import type { Control, UseFormSetValue, UseFormRegister } from 'react-hook-form'
import FormSectionHeader from '../FormSectionHeader'

interface TradeInfoSectionProps {
  control: Control<ProductPostFormValues>
  setValue: UseFormSetValue<ProductPostFormValues>
  register: UseFormRegister<ProductPostFormValues>
  showProductTradeFilter?: boolean
}

export default function TradeInfoSection({ control, setValue, register, showProductTradeFilter = true }: TradeInfoSectionProps) {
  return (
    <div className="flex flex-col gap-5 rounded-xl border border-gray-100 bg-white px-6 py-5">
      <FormSectionHeader heading="거래 정보" />
      <AddressField<ProductPostFormValues>
        control={control}
        setValue={setValue}
        primaryName="addressSido"
        secondaryName="addressGugun"
        label="거래 희망 지역"
        labelClass="heading-h5"
        layoutClass="gap-1"
      />
      {showProductTradeFilter && (
        <>
          <div className="flex items-center gap-2.5">
            <input type="checkbox" id="isDeliveryAvailable" className="h-5 w-5" {...register('isDeliveryAvailable')} />
            <label htmlFor="isDeliveryAvailable" className="heading-h5">
              택배거래 가능
            </label>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="preferredMeetingPlace" className="heading-h5">
              선호하는 만남 장소 (선택항목)
            </label>
            <input
              id="preferredMeetingPlace"
              type="text"
              placeholder="예: 지하철역, 카페, 공원 등"
              className="rounded-lg border border-gray-100 bg-white px-3 py-3"
              {...register('preferredMeetingPlace')}
            />
          </div>
        </>
      )}
    </div>
  )
}
