import { Button } from '@src/components/commons/button/Button'
import { useForm } from 'react-hook-form'
import { type Province } from '@src/constants/cities'
import { useNavigate } from 'react-router-dom'
import ProductImageUpload from './imageUploadField/ImageUploadField'
import BasicInfoSection from './basicInfoSection/BasicInfoSection'
import PriceAndStatusSection from './priceAndStatusSection/PriceAndStatusSection'
import TradeInfoSection from './tradeInfoSection/TradeInfoSection'
import type { ProductPostRequestData } from '@src/types'
import { postProduct } from '@src/api/products'
import { cn } from '@src/utils/cn'

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

export function ProductPostForm() {
  const {
    control,
    handleSubmit, // form onSubmit에 들어가는 함수 : 제출 시 실행할 함수를 감싸주는 함수
    register, // onChange 등의 이벤트 객체 생성 : input에 "이 필드는 폼의 어떤 이름이다"라고 연결해주는 함수
    watch, // 특정 필드 값을 실시간으로 구독
    setValue,
    setError,
    clearErrors,
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

    console.log('전송할 데이터:', requestData)

    try {
      const response = await postProduct(requestData)
      console.log('상품 등록 성공:', response)
      navigate('/')
    } catch (error) {
      console.error('상품 등록 실패:', error)
      if (error instanceof Error && 'response' in error) {
        const axiosError = error as { response?: { data?: unknown } }
        console.error('서버 응답:', axiosError.response?.data)
      }
    }
  }
  return (
    <div role="tabpanel">
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="flex flex-col gap-5">
          <legend className="sr-only">상품 등록폼</legend>
          <div className="flex flex-col gap-5">
            <BasicInfoSection control={control} setValue={setValue} register={register} errors={errors} titleLength={watch('title')?.length ?? 0} />
            <PriceAndStatusSection control={control} register={register} errors={errors} />
            <ProductImageUpload setValue={setValue} errors={errors} setError={setError} clearErrors={clearErrors} />
            <TradeInfoSection control={control} setValue={setValue} register={register} />
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
