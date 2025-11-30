import { SimpleHeader } from '@src/components/header/SimpleHeader'
import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { PRODUCT_TYPE_TABS, type ProductTypeTabId } from '../../constants/constants'
import { Tabs } from '@src/components/Tabs'
import { ProductPostForm } from './components/ProductPostForm'
import { ProductRequestForm } from './components/ProductRequestForm'
import { fetchProductById } from '@src/api/products'
import type { ProductDetailItem } from '@src/types'

function ProductPost() {
  const [searchParams, setSearchParams] = useSearchParams()
  const tabParam = searchParams.get('tab') as ProductTypeTabId | null
  const initialTab = tabParam === 'tab-purchases' ? 'tab-purchases' : 'tab-sales'

  const [activeProductTypeTab, setActiveProductTypeTab] = useState<ProductTypeTabId>(initialTab)
  const [productData, setProductData] = useState<ProductDetailItem | null>(null)
  const { id } = useParams()
  const isEditMode = !!id

  const handleTabChange = (tabId: string) => {
    setActiveProductTypeTab(tabId as ProductTypeTabId)
    setSearchParams({ tab: tabId }, { replace: true })
  }

  const isSalesTab = activeProductTypeTab === 'tab-sales'
  const headerTitle = isSalesTab
    ? isEditMode ? '판매 상품 수정' : '판매 상품 등록'
    : isEditMode ? '판매 요청 수정' : '판매 요청 등록'
  const headerDescription = isSalesTab
    ? isEditMode ? '등록된 상품 정보를 수정할 수 있습니다.' : '상품을 등록하여 다른 사용자들에게 판매할 수 있습니다.'
    : isEditMode ? '등록된 판매 요청 정보를 수정할 수 있습니다.' : '원하는 상품이 없을 때 판매를 요청할 수 있습니다.'

  useEffect(() => {
    const loadProduct = async () => {
      if (isEditMode && id) {
        const data = await fetchProductById(id)
        setProductData(data)
        const tabId = data.productType === 'SELL' ? 'tab-sales' : 'tab-purchases'
        setActiveProductTypeTab(tabId)
      }
    }
    loadProduct()
  }, [id, isEditMode])

  return (
    <>
      <SimpleHeader title={headerTitle} description={headerDescription} />
      <div className="bg-[#F3F4F6] pt-5">
        <div className="px-lg pb-4xl mx-auto max-w-[var(--container-max-width)]">
          <div className="gap-2xl flex w-full flex-col">
            <Tabs
              tabs={PRODUCT_TYPE_TABS}
              activeTab={activeProductTypeTab}
              onTabChange={handleTabChange}
              ariaLabel="상품 타입"
              excludeTabId="tab-all"
            />
            {activeProductTypeTab === 'tab-sales' && <ProductPostForm isEditMode={isEditMode} productId={id} initialData={productData} />}
            {activeProductTypeTab === 'tab-purchases' && <ProductRequestForm isEditMode={isEditMode} productId={id} initialData={productData} />}
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductPost
