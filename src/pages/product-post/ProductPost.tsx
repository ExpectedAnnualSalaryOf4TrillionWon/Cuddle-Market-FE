import { SimpleHeader } from '@src/components/header/SimpleHeader'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PRODUCT_TYPE_TABS, type ProductTypeTabId } from '../../constants/constants'
import { Tabs } from '@src/components/Tabs'
import { ProductPostForm } from './components/ProductPostForm'
import { ProductRequestForm } from './components/ProductRequestForm'
import { fetchProductById } from '@src/api/products'
import type { ProductDetailItem } from '@src/types'

function ProductPost() {
  const [activeProductTypeTab, setActiveProductTypeTab] = useState<ProductTypeTabId>('tab-sales')
  const [productData, setProductData] = useState<ProductDetailItem | null>(null)
  const { id } = useParams()
  const isEditMode = !!id

  useEffect(() => {
    const loadProduct = async () => {
      if (isEditMode && id) {
        const data = await fetchProductById(id)
        setProductData(data)
        const tabId = data.productType === 'SALES' ? 'tab-sales' : 'tab-purchases'
        setActiveProductTypeTab(tabId)
      }
    }
    loadProduct()
  }, [id, isEditMode])

  return (
    <>
      <SimpleHeader title={isEditMode ? '상품 수정' : '상품 등록'} />
      <div className="bg-[#F3F4F6] pt-5">
        <div className="px-lg pb-4xl mx-auto max-w-[var(--container-max-width)]">
          <div className="gap-2xl flex w-full flex-col">
            <Tabs tabs={PRODUCT_TYPE_TABS} activeTab={activeProductTypeTab} onTabChange={(tabId) => setActiveProductTypeTab(tabId as ProductTypeTabId)} ariaLabel="상품 타입" excludeTabId="tab-all" />
            {activeProductTypeTab === 'tab-sales' && <ProductPostForm isEditMode={isEditMode} productId={id} initialData={productData} />}
            {activeProductTypeTab === 'tab-purchases' && <ProductRequestForm isEditMode={isEditMode} productId={id} initialData={productData} />}
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductPost
