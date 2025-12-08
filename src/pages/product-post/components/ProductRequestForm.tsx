import { Button } from '@src/components/commons/button/Button'
import { useForm } from 'react-hook-form'
import { type Province } from '@src/constants/cities'
import { useNavigate } from 'react-router-dom'
import ProductImageUpload from './imageUploadField/ImageUploadField'
import BasicInfoSection from './basicInfoSection/BasicInfoSection'
import PriceAndStatusSection from './priceAndStatusSection/PriceAndStatusSection'
import TradeInfoSection from './tradeInfoSection/TradeInfoSection'
import type { ProductDetailItem, RequestProductPostRequestData } from '@src/types'
import { requestPostProduct } from '@src/api/products'
import { cn } from '@src/utils/cn'
import { useEffect, useMemo } from 'react'

export interface ProductRequestFormValues {
  petType: string
  petDetailType: string
  category: string
  title: string
  description: string
  price: number
  productStatus: string
  mainImageUrl: string
  subImageUrls?: string[]
  addressSido: Province | ''
  addressGugun: string
  isDeliveryAvailable?: boolean
  preferredMeetingPlace?: string
}

interface ProductRequestPostFormProps {
  isEditMode?: boolean
  productId?: string
  initialData?: ProductDetailItem | null
}

export function ProductRequestForm({ isEditMode, productId: id, initialData }: ProductRequestPostFormProps) {
  const {
    control,
    handleSubmit, // form onSubmit에 들어가는 함수 : 제출 시 실행할 함수를 감싸주는 함수
    register, // onChange 등의 이벤트 객체 생성 : input에 "이 필드는 폼의 어떤 이름이다"라고 연결해주는 함수
    setValue,
    setError,
    clearErrors,
    reset,
    watch,
    formState: { errors, isValid }, // errors: register의 에러 메세지 자동 출력 : 각 필드의 에러 상태
  } = useForm<ProductRequestFormValues>({
    mode: 'onChange',
    defaultValues: {
      petType: '',
      petDetailType: '',
      category: '',
      title: '',
      description: '',
      price: 0,
      productStatus: '',
      mainImageUrl: '',
      subImageUrls: [],
      addressSido: '',
      addressGugun: '',
    },
  }) // 폼에서 관리할 필드들의 타입(이름) 정의.
  const navigate = useNavigate()

  const initialImages = useMemo(() => {
    if (initialData) {
      return [initialData.mainImageUrl, ...(initialData.subImageUrls || [])].filter(Boolean)
    }
    return []
  }, [initialData])

  const onSubmit = async (data: ProductRequestFormValues) => {
    const requestData: RequestProductPostRequestData = {
      petType: data.petType,
      petDetailType: data.petDetailType,
      category: data.category,
      title: data.title,
      description: data.description,
      desiredPrice: Number(data.price),
      mainImageUrl: data.mainImageUrl,
      subImageUrls: data.subImageUrls ?? [],
      addressSido: data.addressSido,
      addressGugun: data.addressGugun,
    }

    try {
      await requestPostProduct(requestData)
      navigate(`/products/${id}`)
    } catch {
      alert('상품 등록에 실패했습니다.')
    }
  }

  useEffect(() => {
    if (isEditMode && initialData) {
      reset({
        title: initialData.title,
        description: initialData.description,
        price: initialData.price,
        petType: initialData.petType,
        petDetailType: initialData.petDetailType,
        category: initialData.category,
        productStatus: initialData.productStatus,
        mainImageUrl: initialData.mainImageUrl,
        subImageUrls: initialData.subImageUrls ?? [],
        addressSido: initialData.addressSido as Province | '',
        addressGugun: initialData.addressGugun,
        isDeliveryAvailable: initialData.isDeliveryAvailable ?? false,
        preferredMeetingPlace: initialData.preferredMeetingPlace ?? '',
      })
    }
  }, [isEditMode, initialData, reset])
  return (
    <div role="tabpanel" id="panel-REQUEST" aria-labelledby="tab-purchases">
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="flex flex-col gap-5">
          <legend className="sr-only">회원가입폼</legend>
          <div className="flex flex-col gap-5">
            <BasicInfoSection
              control={control}
              setValue={setValue}
              register={register}
              errors={errors}
              titleLength={watch('title')?.length ?? 0}
              productNameLabel="찾고 있는 상품명"
              productDescriptionLabel="상세 요청사항"
              productDescriptionPlaceHolder="어떤 상품을 찾고 있는지, 원하는 조건(가격대, 상태 등)을 자세히 적어주세요"
            />
            <PriceAndStatusSection
              register={register}
              control={control}
              errors={errors}
              showProductStateFilter={false}
              priceLabel="희망 가격"
              heading="가격"
            />
            <ProductImageUpload
              initialImages={initialImages}
              setValue={setValue}
              errors={errors}
              setError={setError}
              clearErrors={clearErrors}
              mainImageField="mainImageUrl"
              subImagesField="subImageUrls"
            />
            <TradeInfoSection control={control} setValue={setValue} showProductTradeFilter={false} register={register} />
          </div>
          <div className="flex items-center gap-4">
            <Button size="md" className={cn('w-[80%] flex-1 cursor-pointer text-white', !isValid ? 'bg-gray-300' : 'bg-primary-200')} type="submit">
              등록
            </Button>
            <Button size="md" className="w-[20%] cursor-pointer bg-gray-100 text-gray-900" type="button">
              취소
            </Button>
          </div>
        </fieldset>
      </form>
    </div>
  )
}
