import { useNavigate, useParams } from 'react-router-dom'
import { fetchProductById } from '../../api/products'
import { useQuery } from '@tanstack/react-query'
import Footer from '@src/components/footer/Footer'
import MainImage from './components/MainImage'
import SubImages from './components/SubImages'
import SellerProfileCard from './components/SellerProfileCard'
import ProductBadges from './components/ProductBadges'
import ProductSummary from './components/ProductSummary'
import ProductDescription from './components/ProductDescription'
import ProductActions from './components/ProductActions'
import SellerOtherProducts from './components/SellerOtherProducts'

function ProductDetail() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const { data, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id!),
    enabled: !!id,
  })

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          {/* <p className="mb-4 text-red-600">{error || '상품을 찾을 수 없습니다.'}</p> */}
          <button onClick={() => navigate('/')} className="text-blue-600 hover:text-blue-800">
            목록으로 돌아가기
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="px-lg bg-bg pb-4xl mx-auto max-w-[var(--container-max-width)] pt-8">
        <div className="flex flex-col gap-20">
          <div className="flex justify-center gap-8">
            <div className="flex flex-1 flex-col gap-4">
              <MainImage {...data} />
              <SubImages {...data} />
              <SellerProfileCard sellerInfo={data.sellerInfo} />
            </div>

            <div className="flex flex-1 flex-col gap-3.5">
              <div className="flex flex-col gap-9">
                <div className="flex flex-col gap-3.5">
                  <ProductBadges {...data} />
                  <ProductSummary data={data} />
                </div>
                <ProductDescription description={data.description} />
              </div>
              <ProductActions {...data} />
            </div>
          </div>
          <SellerOtherProducts {...data} />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ProductDetail
