export const ROUTES = {
  HOME: '/',
  COURSES: '/courses',
  MYPAGE: '/mypage',
  DETAIL: `/products/:id`,
  DETAIL_ID: (id: string | number) => `/products/${id}`,

  // Community
  FREE: '/free',
  SHARE: '/share',
  QNA: '/qna',
  // STUDY_GROUP_CREATE: '/study-group/create',

  // Product
  PRODUCT_POST: '/product-post',
  PRODUCT_EDIT: '/products/:id/edit',
  // RECRUITMENT_ID: (id: string | number) => `/recruitment/${id}`,
  // RECRUITMENT_DETAIL: '/recruitment/:uuid',
  // RECRUITMENT_CREATE: '/recruitment/create',
  // RECRUITMENT_MANAGE: '/recruitment/manage',
  // RECRUITMENT_EDIT: (uuid: string | number) => `/recruitment/${uuid}/edit`,
  // RECRUITMENT_UUID: (uuid: string) => `/recruitment/${uuid}`,
  // RECRUITMENT_EDIT_PATTERN: '/recruitment/:uuid/edit',

  // Auth
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  FIND_EMAIL: '/auth/find-email',
  FIND_PASSWORD: '/auth/find-password',
} as const
