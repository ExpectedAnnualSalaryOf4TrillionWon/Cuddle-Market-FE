// ========== 반려동물 관련 상수 ==========
export const PETS = {
  포유류: ['강아지', '고양이', '토끼', '햄스터', '기니피그', '페럿', '친칠라', '고슴도치'],
  조류: ['잉꼬', '앵무새', '카나리아', '모란앵무'],
  파충류: ['도마뱀', '뱀', '거북이', '게코'],
  수생동물: ['금붕어', '열대어', '체리새우', '달팽이'],
  '곤충/절지동물': ['귀뚜라미', '사마귀', '딱정벌레', '거미'],
} as const;
export type PetCategory = keyof typeof PETS;
export const PET_CATEGORIES = Object.keys(PETS) as PetCategory[];

// ========== 상품 카테고리 관련 상수 ==========
export const CATEGORY_OPTIONS = [
  { value: 'food', label: '사료/간식' },
  { value: 'toys', label: '장난감' },
  { value: 'housing', label: '사육장/하우스' },
  { value: 'health', label: '건강/위생' },
  { value: 'accessories', label: '의류/악세사리' },
  { value: 'equipment', label: '사육장비' },
  { value: 'transport', label: '이동장/목줄' },
  { value: 'cleaning', label: '청소용품' },
  { value: 'training', label: '훈련용품' },
  { value: 'etc', label: '기타' },
] as const;

export type CategoryValue = (typeof CATEGORY_OPTIONS)[number]['value'];

// ========== 상품 상태 관련 상수 ==========
export type ConditionValue = '새 상품' | '거의 새것' | '사용감 있음' | '수리 필요';

export interface ConditionItem {
  value: ConditionValue;
  subtitle: string;
}

export const CONDITION_ITEMS: ReadonlyArray<ConditionItem> = [
  { value: '새 상품', subtitle: '미사용 상품' },
  { value: '거의 새것', subtitle: '사용감 거의 없음' },
  { value: '사용감 있음', subtitle: '일반적인 사용흔적' },
  { value: '수리 필요', subtitle: '수리 후 사용가능' },
];

// ========== 지역 관련 상수 ==========
export const CITIES = {
  서울특별시: [
    '강남구',
    '강동구',
    '강북구',
    '강서구',
    '관악구',
    '광진구',
    '구로구',
    '금천구',
    '노원구',
    '도봉구',
    '동대문구',
    '동작구',
    '마포구',
    '서대문구',
    '서초구',
    '성동구',
    '성북구',
    '송파구',
    '양천구',
    '영등포구',
    '용산구',
    '은평구',
    '종로구',
    '중구',
    '중랑구',
  ],
  부산광역시: [
    '강서구',
    '금정구',
    '기장군',
    '남구',
    '동구',
    '동래구',
    '부산진구',
    '북구',
    '사상구',
    '사하구',
    '서구',
    '수영구',
    '연제구',
    '영도구',
    '중구',
    '해운대구',
  ],
  대구광역시: ['남구', '달서구', '달성군', '동구', '북구', '서구', '수성구', '중구'],
  인천광역시: [
    '강화군',
    '계양구',
    '남동구',
    '동구',
    '미추홀구',
    '부평구',
    '서구',
    '연수구',
    '옹진군',
    '중구',
  ],
  광주광역시: ['광산구', '남구', '동구', '북구', '서구'],
  대전광역시: ['대덕구', '동구', '서구', '유성구', '중구'],
  울산광역시: ['남구', '동구', '북구', '울주군', '중구'],
  세종특별자치시: ['세종시'],
} as const;

export type Province = keyof typeof CITIES;
export const PROVINCES = Object.keys(CITIES) as Province[];

// ========== 탭 관련 상수 ==========
export const PRODUCT_POST_TABS = [
  { id: 'sales', label: '판매' },
  { id: 'purchases', label: '판매요청' },
] as const;

export type ProductPostTabId = (typeof PRODUCT_POST_TABS)[number]['id'];

export const ProductState = {
  Selling: 'selling',
  Reserved: 'reserved',
  Sold: 'sold',
} as const;
export type ProductState = (typeof ProductState)[keyof typeof ProductState];

export const stateLabelMap: Record<ProductState, string> = {
  [ProductState.Selling]: '판매중',
  [ProductState.Reserved]: '예약중',
  [ProductState.Sold]: '판매완료',
};

export const stateStyleMap: Record<ProductState, string> = {
  [ProductState.Selling]: 'bg-sale border-sale',
  [ProductState.Reserved]: 'bg-reserved border-reserved',
  [ProductState.Sold]: 'bg-complete border-complete',
};

export const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
  'image/bmp',
];
