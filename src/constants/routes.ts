export const ROUTES = {
  HOME: '/',
  COURSES: '/courses',
  MYPAGE: '/mypage',

  // // Study Group
  // STUDY_GROUP: '/study-group',
  // STUDY_GROUP_ID: (id: string | number) => `/study-group/${id}`,
  // STUDY_GROUP_DETAIL: '/study-group/:id',
  // STUDY_GROUP_CREATE: '/study-group/create',

  // // Recruitment
  // RECRUITMENT: '/recruitment',
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
} as const;
