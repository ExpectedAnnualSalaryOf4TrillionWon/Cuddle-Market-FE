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
import { useEffect } from 'react'
import { useSEO } from '@src/hooks/useSEO'

function ProductDetail() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const { data, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id!),
    enabled: !!id,
  })
  const seo = useSEO({
    title: data?.title,
    description: data?.description,
    image: data?.mainImageUrl,
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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
        <div className="flex flex-col items-center gap-4">
          <p>상품 정보를 불러올 수 없습니다</p>
          <button onClick={() => navigate('/')} className="text-blue-600 hover:text-blue-800">
            목록으로 돌아가기
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      {seo}
      <div className="px-lg pb-4xl mx-auto max-w-7xl bg-white pt-8">
        <div className="flex flex-col gap-20">
          <div className="flex flex-col justify-center gap-8 md:flex-row">
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
