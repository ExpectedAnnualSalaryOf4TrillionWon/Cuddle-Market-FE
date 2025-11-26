import { PRODUCT_CATEGORIES } from '@src/constants/constants'

export const getCategory = (categoryCode: string) => {
  const category = PRODUCT_CATEGORIES.find((category) => category.code === categoryCode)
  return category?.name || categoryCode
}
