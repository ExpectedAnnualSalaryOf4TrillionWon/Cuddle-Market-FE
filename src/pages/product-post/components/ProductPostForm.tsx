import { Button } from '@src/components/commons/button/Button'
import { useForm } from 'react-hook-form'
import { type Province } from '@src/constants/cities'
import { useNavigate } from 'react-router-dom'
import ProductImageUpload from './imageUploadField/ImageUploadField'
import BasicInfoSection from './basicInfoSection/BasicInfoSection'
import PriceAndStatusSection from './priceAndStatusSection/PriceAndStatusSection'
import TradeInfoSection from './tradeInfoSection/TradeInfoSection'
import type { ProductDetailItem, ProductPostRequestData } from '@src/types'
import { patchProduct, postProduct } from '@src/api/products'
import { cn } from '@src/utils/cn'
import { useEffect, useMemo } from 'react'

export interface ProductPostFormValues {
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

interface ProductPostFormProps {
  isEditMode?: boolean
  productId?: string
  initialData?: ProductDetailItem | null
}

export function ProductPostForm({ isEditMode, productId: id, initialData }: ProductPostFormProps) {
  const {
    control,
    handleSubmit, // form onSubmit에 들어가는 함수 : 제출 시 실행할 함수를 감싸주는 함수
    register, // onChange 등의 이벤트 객체 생성 : input에 "이 필드는 폼의 어떤 이름이다"라고 연결해주는 함수
    watch, // 특정 필드 값을 실시간으로 구독
    setValue,
    setError,
    clearErrors,
    reset,
    formState: { errors, isValid }, // errors: Controller/register의 에러 메세지 자동 출력 : 각 필드의 에러 상태
  } = useForm<ProductPostFormValues>({
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
      isDeliveryAvailable: false,
      preferredMeetingPlace: '',
    },
  }) // 폼에서 관리할 필드들의 타입(이름) 정의.
  const navigate = useNavigate()

  const initialImages = useMemo(() => {
    if (initialData) {
      return [initialData.mainImageUrl, ...(initialData.subImageUrls || [])].filter(Boolean)
    }
    return []
  }, [initialData])

  const onSubmit = async (data: ProductPostFormValues) => {
    const requestData: ProductPostRequestData = {
      petType: data.petType,
      petDetailType: data.petDetailType,
      category: data.category,
      title: data.title,
      description: data.description,
      price: Number(data.price),
      productStatus: data.productStatus,
      mainImageUrl: data.mainImageUrl,
      subImageUrls: data.subImageUrls ?? [],
      addressSido: data.addressSido,
      addressGugun: data.addressGugun,
      isDeliveryAvailable: data.isDeliveryAvailable ?? false,
      preferredMeetingPlace: data.preferredMeetingPlace ?? '',
    }

    try {
      if (isEditMode && id) {
        // 편집 모드: 기존 상품 ID로 이동
        await patchProduct(requestData, Number(id))
        navigate(`/products/${id}`)
      } else {
        // 새 등록: 서버에서 생성된 ID로 이동
        const createdProduct = await postProduct(requestData)
        navigate(`/products/${createdProduct.id}`)
      }
    } catch {
      alert(isEditMode ? '상품 수정에 실패했습니다.' : '상품 등록에 실패했습니다.')
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
    <div role="tabpanel" id="panel-SELL" aria-labelledby="tab-sales">
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="flex flex-col gap-5">
          <legend className="sr-only">상품 등록폼</legend>
          <div className="flex flex-col gap-5">
            <BasicInfoSection control={control} setValue={setValue} register={register} errors={errors} titleLength={watch('title')?.length ?? 0} />
            <PriceAndStatusSection control={control} register={register} errors={errors} />
            <ProductImageUpload
              initialImages={initialImages}
              setValue={setValue}
              errors={errors}
              setError={setError}
              clearErrors={clearErrors}
              mainImageField="mainImageUrl"
              subImagesField="subImageUrls"
              description="상품 이미지를 업로드 해주세요. 첫번째 이미지가 대표 이미지가 됩니다. (최대 5장)"
            />
            <TradeInfoSection control={control} setValue={setValue} register={register} />
          </div>
          <div className="flex items-center gap-4">
            <Button size="md" className={cn('w-[80%] flex-1 cursor-pointer text-white', !isValid ? 'bg-gray-300' : 'bg-primary-200')} type="submit">
              {isEditMode ? '수정' : '등록'}
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
