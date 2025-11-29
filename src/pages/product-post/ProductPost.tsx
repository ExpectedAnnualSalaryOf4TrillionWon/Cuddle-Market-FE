import { SimpleHeader } from '@src/components/layouts/SimpleHeader'
import { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import type { ProductTypeTabId } from '../../constants/constants'
import { ProductTypeTabs } from '../home/components/tab/ProductTypeTabs'
import { ProductPostForm } from './components/ProductPostForm'
import { ProductRequestForm } from './components/ProductRequestForm'

function ProductPost() {
  const [activeProductTypeTab, setActiveProductTypeTab] = useState<ProductTypeTabId>('tab-sales')
  const { id } = useParams()
  const isEditMode = !!id
  return (
    <>
      <SimpleHeader title={isEditMode ? '상품 수정' : '상품 등록'} />
      <div className="bg-[#F3F4F6] pt-5">
        <div className="px-lg pb-4xl mx-auto max-w-[var(--container-max-width)]">
          <div className="gap-2xl flex w-full flex-col">
            <ProductTypeTabs activeTab={activeProductTypeTab} onTabChange={setActiveProductTypeTab} hideAllTab />
            {activeProductTypeTab === 'tab-sales' && <ProductPostForm isEditMode={isEditMode} productId={id} />}
            {activeProductTypeTab === 'tab-purchases' && <ProductRequestForm />}
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductPost
