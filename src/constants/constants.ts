// ========== 반려동물 관련 상수 ==========
export const PETS = [
  {
    code: 'MAMMAL',
    name: '포유류',
    details: [
      {
        code: 'DOG',
        name: '강아지',
      },
      {
        code: 'CAT',
        name: '고양이',
      },
      {
        code: 'RABBIT',
        name: '토끼',
      },
      {
        code: 'HAMSTER',
        name: '햄스터',
      },
      {
        code: 'GUINEA_PIG',
        name: '기니피그',
      },
      {
        code: 'FERRET',
        name: '페럿',
      },
      {
        code: 'CHINCHILLA',
        name: '친칠라',
      },
      {
        code: 'HEDGEHOG',
        name: '고슴도치',
      },
    ],
  },
  {
    code: 'BIRD',
    name: '조류',
    details: [
      {
        code: 'BUDGERIGAR',
        name: '잉꼬',
      },
      {
        code: 'PARROT',
        name: '앵무새',
      },
      {
        code: 'CANARY',
        name: '카나리아',
      },
      {
        code: 'LOVEBIRD',
        name: '모란앵무',
      },
    ],
  },
  {
    code: 'REPTILE',
    name: '파충류',
    details: [
      {
        code: 'LIZARD',
        name: '도마뱀',
      },
      {
        code: 'SNAKE',
        name: '뱀',
      },
      {
        code: 'TURTLE',
        name: '거북이',
      },
      {
        code: 'GECKO',
        name: '게코',
      },
    ],
  },
  {
    code: 'FISH',
    name: '수생동물',
    details: [
      {
        code: 'GOLDFISH',
        name: '금붕어',
      },
      {
        code: 'TROPICAL_FISH',
        name: '열대어',
      },
      {
        code: 'CHERRY_SHRIMP',
        name: '체리새우',
      },
      {
        code: 'SNAIL',
        name: '달팽이',
      },
    ],
  },
  {
    code: 'AMPHIBIAN',
    name: '곤충/절지동물',
    details: [
      {
        code: 'CRICKET',
        name: '귀뚜라미',
      },
      {
        code: 'MANTIS',
        name: '사마귀',
      },
      {
        code: 'BEETLE',
        name: '딱정벌레',
      },
      {
        code: 'SPIDER',
        name: '거미',
      },
    ],
  },
] as const

export const PET_TYPE_TABS = [
  { id: 'tab-all', label: '전체', code: 'ALL' },
  { id: 'tab-mammal', label: '포유류', code: 'MAMMAL' },
  { id: 'tab-bird', label: '조류', code: 'BIRD' },
  { id: 'tab-reptile', label: '파충류', code: 'REPTILE' },
  { id: 'tab-fish', label: '수생동물', code: 'FISH' },
  { id: 'tab-amphibian', label: '곤충/절지동물', code: 'AMPHIBIAN' },
  { id: 'tab-etc', label: '기타', code: 'ETC' },
] as const
export type PetTypeTabId = (typeof PET_TYPE_TABS)[number]['id']

export const PET_DETAILS: Array<{ code: string; name: string; categoryCode?: string }> = []
PETS.forEach((category) => {
  category.details.forEach((pet) => {
    PET_DETAILS.push({
      code: pet.code,
      name: pet.name,
    })
  })
})

// ========== 상품 상태 관련 상수 ==========
export const CONDITION_ITEMS: Array<{ value: string; title: string; subtitle: string }> = [
  { value: 'NEW', title: '새 상품', subtitle: '미사용 상품' },
  { value: 'LIKE_NEW', title: '거의 새것', subtitle: '사용감 거의 없음' },
  { value: 'USED', title: '사용감 있음', subtitle: '일반적인 사용흔적' },
  { value: 'NEED_REPAIR', title: '수리 필요', subtitle: '수리 후 사용가능' },
]

// ========== 상품 카테고리 관련 상수 ==========
export const PRODUCT_CATEGORIES = [
  { code: 'FOOD', name: '사료/간식' },
  { code: 'TOY', name: '장난감' },
  { code: 'HOUSE', name: '사육장/하우스' },
  { code: 'HEALTH', name: '건강/위생' },
  { code: 'CLOTHING', name: '의류/악세사리' },
  { code: 'WALKING', name: '이동장/목줄' },
  { code: 'GROOMING', name: '미용용품' },
  { code: 'ETC', name: '기타' },
] as const
export type CategoryFilter = string | null
export type CategoryName = (typeof PRODUCT_CATEGORIES)[number]['name']

// ========== 거래상태 관련 상수 ==========
export const STATUS_EN_TO_KO: Array<{ value: string; name: string; bgColor: string }> = [
  { value: 'SELLING', name: '판매중', bgColor: 'bg-onsale' },
  { value: 'RESERVED', name: '예약중', bgColor: 'bg-reserved' },
  { value: 'COMPLETED', name: '판매완료', bgColor: 'bg-complete' },
]
export type TransactionStatus = 'SELLING' | 'RESERVED' | 'COMPLETED'
export const stateStyleMap: Record<TransactionStatus, string> = {
  SELLING: 'bg-sale border-sale',
  RESERVED: 'bg-reserved border-reserved',
  COMPLETED: 'bg-complete border-complete',
}

// ========== 탭 관련 상수 ==========
export const PRODUCT_TYPE_TABS = [
  { id: 'tab-all', label: '전체', code: 'ALL' },
  { id: 'tab-sales', label: '판매', code: 'SELL' },
  { id: 'tab-purchases', label: '판매요청', code: 'REQUEST' },
] as const
export type ProductTypeTabId = (typeof PRODUCT_TYPE_TABS)[number]['id']

// 상품 등록용 탭 (기존 호환성)
export const PRODUCT_POST_TABS = [
  { id: 'tab-sales', label: '판매', code: 'SELL' },
  { id: 'tab-purchases', label: '판매요청', code: 'REQUEST' },
] as const
export type ProductPostTabId = (typeof PRODUCT_POST_TABS)[number]['id']

// 마이페이지 용 탭
export const MY_PAGE_TABS = [
  { id: 'tab-sales', label: '판매상품', code: 'SELL' },
  { id: 'tab-purchases', label: '판매요청', code: 'REQUEST' },
  { id: 'tab-wishlist', label: '찜한 상품', code: 'favorites' },
  { id: 'tab-blocked', label: '차단 유저', code: 'blocked-users' },
] as const
export type MyPageTabId = (typeof MY_PAGE_TABS)[number]['id']

// ========== 가격대 관련 상수 ==========
export const PRICE_TYPE = [
  { value: { min: 0, max: 10000 }, title: '1만원 이하' },
  { value: { min: 10000, max: 50000 }, title: '1만원~5만원' },
  { value: { min: 50000, max: 100000 }, title: '5만원~10만원' },
  { value: { min: 100000, max: null }, title: '10만원 이상' },
]

export interface PriceRange {
  min: number
  max: number | null
}

// ========== 지역 관련 상수 ==========
export const LOCATIONS = [
  {
    code: 'SEOUL',
    name: '서울특별시',
    cities: [
      {
        code: 'SEOUL-01',
        name: '종로구',
      },
      {
        code: 'SEOUL-02',
        name: '중구',
      },
      {
        code: 'SEOUL-03',
        name: '용산구',
      },
      {
        code: 'SEOUL-04',
        name: '성동구',
      },
      {
        code: 'SEOUL-05',
        name: '광진구',
      },
      {
        code: 'SEOUL-06',
        name: '동대문구',
      },
      {
        code: 'SEOUL-07',
        name: '중랑구',
      },
      {
        code: 'SEOUL-08',
        name: '성북구',
      },
      {
        code: 'SEOUL-09',
        name: '강북구',
      },
      {
        code: 'SEOUL-10',
        name: '도봉구',
      },
      {
        code: 'SEOUL-11',
        name: '노원구',
      },
      {
        code: 'SEOUL-12',
        name: '은평구',
      },
      {
        code: 'SEOUL-13',
        name: '서대문구',
      },
      {
        code: 'SEOUL-14',
        name: '마포구',
      },
      {
        code: 'SEOUL-15',
        name: '양천구',
      },
      {
        code: 'SEOUL-16',
        name: '강서구',
      },
      {
        code: 'SEOUL-17',
        name: '구로구',
      },
      {
        code: 'SEOUL-18',
        name: '금천구',
      },
      {
        code: 'SEOUL-19',
        name: '영등포구',
      },
      {
        code: 'SEOUL-20',
        name: '동작구',
      },
      {
        code: 'SEOUL-21',
        name: '관악구',
      },
      {
        code: 'SEOUL-22',
        name: '서초구',
      },
      {
        code: 'SEOUL-23',
        name: '강남구',
      },
      {
        code: 'SEOUL-24',
        name: '송파구',
      },
      {
        code: 'SEOUL-25',
        name: '강동구',
      },
    ],
  },
  {
    code: 'GYEONGGIDO',
    name: '경기도',
    cities: [
      {
        code: 'GYEONGGIDO-01',
        name: '수원시',
      },
      {
        code: 'GYEONGGIDO-02',
        name: '성남시',
      },
      {
        code: 'GYEONGGIDO-03',
        name: '고양시',
      },
      {
        code: 'GYEONGGIDO-04',
        name: '용인시',
      },
      {
        code: 'GYEONGGIDO-05',
        name: '부천시',
      },
      {
        code: 'GYEONGGIDO-06',
        name: '안산시',
      },
      {
        code: 'GYEONGGIDO-07',
        name: '안양시',
      },
      {
        code: 'GYEONGGIDO-08',
        name: '남양주시',
      },
      {
        code: 'GYEONGGIDO-09',
        name: '화성시',
      },
      {
        code: 'GYEONGGIDO-10',
        name: '평택시',
      },
      {
        code: 'GYEONGGIDO-11',
        name: '의정부시',
      },
      {
        code: 'GYEONGGIDO-12',
        name: '시흥시',
      },
      {
        code: 'GYEONGGIDO-13',
        name: '파주시',
      },
      {
        code: 'GYEONGGIDO-14',
        name: '김포시',
      },
      {
        code: 'GYEONGGIDO-15',
        name: '광명시',
      },
      {
        code: 'GYEONGGIDO-16',
        name: '광주시',
      },
      {
        code: 'GYEONGGIDO-17',
        name: '군포시',
      },
      {
        code: 'GYEONGGIDO-18',
        name: '오산시',
      },
      {
        code: 'GYEONGGIDO-19',
        name: '이천시',
      },
      {
        code: 'GYEONGGIDO-20',
        name: '양주시',
      },
      {
        code: 'GYEONGGIDO-21',
        name: '구리시',
      },
      {
        code: 'GYEONGGIDO-22',
        name: '안성시',
      },
      {
        code: 'GYEONGGIDO-23',
        name: '포천시',
      },
      {
        code: 'GYEONGGIDO-24',
        name: '의왕시',
      },
      {
        code: 'GYEONGGIDO-25',
        name: '하남시',
      },
      {
        code: 'GYEONGGIDO-26',
        name: '여주시',
      },
      {
        code: 'GYEONGGIDO-27',
        name: '동두천시',
      },
      {
        code: 'GYEONGGIDO-28',
        name: '과천시',
      },
      {
        code: 'GYEONGGIDO-29',
        name: '가평군',
      },
      {
        code: 'GYEONGGIDO-30',
        name: '양평군',
      },
      {
        code: 'GYEONGGIDO-31',
        name: '연천군',
      },
    ],
  },
  {
    code: 'INCHEON',
    name: '인천광역시',
    cities: [
      {
        code: 'INCHEON-01',
        name: '중구',
      },
      {
        code: 'INCHEON-02',
        name: '동구',
      },
      {
        code: 'INCHEON-03',
        name: '미추홀구',
      },
      {
        code: 'INCHEON-04',
        name: '연수구',
      },
      {
        code: 'INCHEON-05',
        name: '남동구',
      },
      {
        code: 'INCHEON-06',
        name: '부평구',
      },
      {
        code: 'INCHEON-07',
        name: '계양구',
      },
      {
        code: 'INCHEON-08',
        name: '서구',
      },
      {
        code: 'INCHEON-09',
        name: '강화군',
      },
      {
        code: 'INCHEON-10',
        name: '옹진군',
      },
    ],
  },
  {
    code: 'BUSAN',
    name: '부산광역시',
    cities: [
      {
        code: 'BUSAN-01',
        name: '중구',
      },
      {
        code: 'BUSAN-02',
        name: '서구',
      },
      {
        code: 'BUSAN-03',
        name: '동구',
      },
      {
        code: 'BUSAN-04',
        name: '영도구',
      },
      {
        code: 'BUSAN-05',
        name: '부산진구',
      },
      {
        code: 'BUSAN-06',
        name: '동래구',
      },
      {
        code: 'BUSAN-07',
        name: '남구',
      },
      {
        code: 'BUSAN-08',
        name: '북구',
      },
      {
        code: 'BUSAN-09',
        name: '해운대구',
      },
      {
        code: 'BUSAN-10',
        name: '사하구',
      },
      {
        code: 'BUSAN-11',
        name: '금정구',
      },
      {
        code: 'BUSAN-12',
        name: '강서구',
      },
      {
        code: 'BUSAN-13',
        name: '연제구',
      },
      {
        code: 'BUSAN-14',
        name: '수영구',
      },
      {
        code: 'BUSAN-15',
        name: '사상구',
      },
      {
        code: 'BUSAN-16',
        name: '기장군',
      },
    ],
  },
  {
    code: 'GYEONGNAM',
    name: '경상남도',
    cities: [
      {
        code: 'GYEONGNAM-01',
        name: '창원시',
      },
      {
        code: 'GYEONGNAM-02',
        name: '진주시',
      },
      {
        code: 'GYEONGNAM-03',
        name: '통영시',
      },
      {
        code: 'GYEONGNAM-04',
        name: '사천시',
      },
      {
        code: 'GYEONGNAM-05',
        name: '김해시',
      },
      {
        code: 'GYEONGNAM-06',
        name: '밀양시',
      },
      {
        code: 'GYEONGNAM-07',
        name: '거제시',
      },
      {
        code: 'GYEONGNAM-08',
        name: '양산시',
      },
      {
        code: 'GYEONGNAM-09',
        name: '의령군',
      },
      {
        code: 'GYEONGNAM-10',
        name: '함안군',
      },
      {
        code: 'GYEONGNAM-11',
        name: '창녕군',
      },
      {
        code: 'GYEONGNAM-12',
        name: '고성군',
      },
      {
        code: 'GYEONGNAM-13',
        name: '남해군',
      },
      {
        code: 'GYEONGNAM-14',
        name: '하동군',
      },
      {
        code: 'GYEONGNAM-15',
        name: '산청군',
      },
      {
        code: 'GYEONGNAM-16',
        name: '함양군',
      },
      {
        code: 'GYEONGNAM-17',
        name: '거창군',
      },
      {
        code: 'GYEONGNAM-18',
        name: '합천군',
      },
    ],
  },
  {
    code: 'GYEONGBUK',
    name: '경상북도',
    cities: [
      {
        code: 'GYEONGBUK-01',
        name: '포항시',
      },
      {
        code: 'GYEONGBUK-02',
        name: '경주시',
      },
      {
        code: 'GYEONGBUK-03',
        name: '김천시',
      },
      {
        code: 'GYEONGBUK-04',
        name: '안동시',
      },
      {
        code: 'GYEONGBUK-05',
        name: '구미시',
      },
      {
        code: 'GYEONGBUK-06',
        name: '영주시',
      },
      {
        code: 'GYEONGBUK-07',
        name: '영천시',
      },
      {
        code: 'GYEONGBUK-08',
        name: '상주시',
      },
      {
        code: 'GYEONGBUK-09',
        name: '문경시',
      },
      {
        code: 'GYEONGBUK-10',
        name: '경산시',
      },
      {
        code: 'GYEONGBUK-11',
        name: '의성군',
      },
      {
        code: 'GYEONGBUK-12',
        name: '청송군',
      },
      {
        code: 'GYEONGBUK-13',
        name: '영양군',
      },
      {
        code: 'GYEONGBUK-14',
        name: '영덕군',
      },
      {
        code: 'GYEONGBUK-15',
        name: '청도군',
      },
      {
        code: 'GYEONGBUK-16',
        name: '고령군',
      },
      {
        code: 'GYEONGBUK-17',
        name: '성주군',
      },
      {
        code: 'GYEONGBUK-18',
        name: '칠곡군',
      },
      {
        code: 'GYEONGBUK-19',
        name: '예천군',
      },
      {
        code: 'GYEONGBUK-20',
        name: '봉화군',
      },
      {
        code: 'GYEONGBUK-21',
        name: '울진군',
      },
      {
        code: 'GYEONGBUK-22',
        name: '울릉군',
      },
    ],
  },
  {
    code: 'DAEGU',
    name: '대구광역시',
    cities: [
      {
        code: 'DAEGU-01',
        name: '중구',
      },
      {
        code: 'DAEGU-02',
        name: '동구',
      },
      {
        code: 'DAEGU-03',
        name: '서구',
      },
      {
        code: 'DAEGU-04',
        name: '남구',
      },
      {
        code: 'DAEGU-05',
        name: '북구',
      },
      {
        code: 'DAEGU-06',
        name: '수성구',
      },
      {
        code: 'DAEGU-07',
        name: '달서구',
      },
      {
        code: 'DAEGU-08',
        name: '달성군',
      },
      {
        code: 'DAEGU-09',
        name: '군위군',
      },
    ],
  },
  {
    code: 'CHUNGNAM',
    name: '충청남도',
    cities: [
      {
        code: 'CHUNGNAM-01',
        name: '천안시',
      },
      {
        code: 'CHUNGNAM-02',
        name: '공주시',
      },
      {
        code: 'CHUNGNAM-03',
        name: '보령시',
      },
      {
        code: 'CHUNGNAM-04',
        name: '아산시',
      },
      {
        code: 'CHUNGNAM-05',
        name: '서산시',
      },
      {
        code: 'CHUNGNAM-06',
        name: '논산시',
      },
      {
        code: 'CHUNGNAM-07',
        name: '계룡시',
      },
      {
        code: 'CHUNGNAM-08',
        name: '당진시',
      },
      {
        code: 'CHUNGNAM-09',
        name: '금산군',
      },
      {
        code: 'CHUNGNAM-10',
        name: '부여군',
      },
      {
        code: 'CHUNGNAM-11',
        name: '서천군',
      },
      {
        code: 'CHUNGNAM-12',
        name: '청양군',
      },
      {
        code: 'CHUNGNAM-13',
        name: '홍성군',
      },
      {
        code: 'CHUNGNAM-14',
        name: '예산군',
      },
      {
        code: 'CHUNGNAM-15',
        name: '태안군',
      },
    ],
  },
  {
    code: 'CHUNGBUK',
    name: '충청북도',
    cities: [
      {
        code: 'CHUNGBUK-01',
        name: '청주시',
      },
      {
        code: 'CHUNGBUK-02',
        name: '충주시',
      },
      {
        code: 'CHUNGBUK-03',
        name: '제천시',
      },
      {
        code: 'CHUNGBUK-04',
        name: '보은군',
      },
      {
        code: 'CHUNGBUK-05',
        name: '옥천군',
      },
      {
        code: 'CHUNGBUK-06',
        name: '영동군',
      },
      {
        code: 'CHUNGBUK-07',
        name: '증평군',
      },
      {
        code: 'CHUNGBUK-08',
        name: '진천군',
      },
      {
        code: 'CHUNGBUK-09',
        name: '괴산군',
      },
      {
        code: 'CHUNGBUK-10',
        name: '음성군',
      },
      {
        code: 'CHUNGBUK-11',
        name: '단양군',
      },
    ],
  },
  {
    code: 'JEONNAM',
    name: '전라남도',
    cities: [
      {
        code: 'JEONNAM-01',
        name: '목포시',
      },
      {
        code: 'JEONNAM-02',
        name: '여수시',
      },
      {
        code: 'JEONNAM-03',
        name: '순천시',
      },
      {
        code: 'JEONNAM-04',
        name: '나주시',
      },
      {
        code: 'JEONNAM-05',
        name: '광양시',
      },
      {
        code: 'JEONNAM-06',
        name: '담양군',
      },
      {
        code: 'JEONNAM-07',
        name: '곡성군',
      },
      {
        code: 'JEONNAM-08',
        name: '구례군',
      },
      {
        code: 'JEONNAM-09',
        name: '고흥군',
      },
      {
        code: 'JEONNAM-10',
        name: '보성군',
      },
      {
        code: 'JEONNAM-11',
        name: '화순군',
      },
      {
        code: 'JEONNAM-12',
        name: '장흥군',
      },
      {
        code: 'JEONNAM-13',
        name: '강진군',
      },
      {
        code: 'JEONNAM-14',
        name: '해남군',
      },
      {
        code: 'JEONNAM-15',
        name: '영암군',
      },
      {
        code: 'JEONNAM-16',
        name: '무안군',
      },
      {
        code: 'JEONNAM-17',
        name: '함평군',
      },
      {
        code: 'JEONNAM-18',
        name: '영광군',
      },
      {
        code: 'JEONNAM-19',
        name: '장성군',
      },
      {
        code: 'JEONNAM-20',
        name: '완도군',
      },
      {
        code: 'JEONNAM-21',
        name: '진도군',
      },
      {
        code: 'JEONNAM-22',
        name: '신안군',
      },
    ],
  },
  {
    code: 'JEONBUK',
    name: '전북특별자치도',
    cities: [
      {
        code: 'JEONBUK-01',
        name: '전주시',
      },
      {
        code: 'JEONBUK-02',
        name: '익산시',
      },
      {
        code: 'JEONBUK-03',
        name: '군산시',
      },
      {
        code: 'JEONBUK-04',
        name: '정읍시',
      },
      {
        code: 'JEONBUK-05',
        name: '남원시',
      },
      {
        code: 'JEONBUK-06',
        name: '김제시',
      },
      {
        code: 'JEONBUK-07',
        name: '완주군',
      },
      {
        code: 'JEONBUK-08',
        name: '진안군',
      },
      {
        code: 'JEONBUK-09',
        name: '무주군',
      },
      {
        code: 'JEONBUK-10',
        name: '장수군',
      },
      {
        code: 'JEONBUK-11',
        name: '임실군',
      },
      {
        code: 'JEONBUK-12',
        name: '순창군',
      },
      {
        code: 'JEONBUK-13',
        name: '고창군',
      },
      {
        code: 'JEONBUK-14',
        name: '부안군',
      },
    ],
  },
  {
    code: 'GANGWON',
    name: '강원특별자치도',
    cities: [
      {
        code: 'GANGWON-01',
        name: '춘천시',
      },
      {
        code: 'GANGWON-02',
        name: '원주시',
      },
      {
        code: 'GANGWON-03',
        name: '강릉시',
      },
      {
        code: 'GANGWON-04',
        name: '동해시',
      },
      {
        code: 'GANGWON-05',
        name: '태백시',
      },
      {
        code: 'GANGWON-06',
        name: '속초시',
      },
      {
        code: 'GANGWON-07',
        name: '삼척시',
      },
      {
        code: 'GANGWON-08',
        name: '홍천군',
      },
      {
        code: 'GANGWON-09',
        name: '횡성군',
      },
      {
        code: 'GANGWON-10',
        name: '영월군',
      },
      {
        code: 'GANGWON-11',
        name: '평창군',
      },
      {
        code: 'GANGWON-12',
        name: '정선군',
      },
      {
        code: 'GANGWON-13',
        name: '철원군',
      },
      {
        code: 'GANGWON-14',
        name: '화천군',
      },
      {
        code: 'GANGWON-15',
        name: '양구군',
      },
      {
        code: 'GANGWON-16',
        name: '인제군',
      },
      {
        code: 'GANGWON-17',
        name: '고성군',
      },
      {
        code: 'GANGWON-18',
        name: '양양군',
      },
    ],
  },
  {
    code: 'DAEJEON',
    name: '대전광역시',
    cities: [
      {
        code: 'DAEJEON-01',
        name: '동구',
      },
      {
        code: 'DAEJEON-02',
        name: '중구',
      },
      {
        code: 'DAEJEON-03',
        name: '서구',
      },
      {
        code: 'DAEJEON-04',
        name: '유성구',
      },
      {
        code: 'DAEJEON-05',
        name: '대덕구',
      },
    ],
  },
  {
    code: 'GWANGJU',
    name: '광주광역시',
    cities: [
      {
        code: 'GWANGJU-01',
        name: '동구',
      },
      {
        code: 'GWANGJU-02',
        name: '서구',
      },
      {
        code: 'GWANGJU-03',
        name: '남구',
      },
      {
        code: 'GWANGJU-04',
        name: '북구',
      },
      {
        code: 'GWANGJU-05',
        name: '광산구',
      },
    ],
  },
  {
    code: 'ULSAN',
    name: '울산광역시',
    cities: [
      {
        code: 'ULSAN-01',
        name: '중구',
      },
      {
        code: 'ULSAN-02',
        name: '남구',
      },
      {
        code: 'ULSAN-03',
        name: '동구',
      },
      {
        code: 'ULSAN-04',
        name: '북구',
      },
      {
        code: 'ULSAN-05',
        name: '울주군',
      },
    ],
  },
  {
    code: 'JEJU',
    name: '제주특별자치도',
    cities: [
      {
        code: 'JEJU-01',
        name: '제주시',
      },
      {
        code: 'JEJU-02',
        name: '서귀포시',
      },
    ],
  },
  {
    code: 'SEJONG',
    name: '세종특별자치시',
    cities: [],
  },
] as const

export type StateCode = (typeof LOCATIONS)[number]['name']

export type CityCode = (typeof LOCATIONS)[number]['cities'][number]['code']

export interface LocationFilter {
  sido: string | null
  gugun: string | null
}

// ========== 상품상태 관련 상수 ==========
export const SORT_TYPE = [
  { id: 'createdAt', label: '최신순' },
  { id: 'orderedLowPriced', label: '가격 낮은순' },
  { id: 'orderedHighPriced', label: '가격 높은순' },
  { id: 'favoriteCount', label: '찜 많은순' },
]
export type SORT_LABELS = (typeof SORT_TYPE)[number]['label']

export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml', 'image/bmp']

export const MAX_FILES = 5

// ========== 회원탈퇴 이유 관련 상수 ==========
export const WiTH_DRAW_REASON = [
  { id: 'SERVICE_DISSATISFACTION', label: '서비스 불만족' },
  { id: 'PRIVACY_CONCERN', label: '개인정보 우려' },
  { id: 'LOW_USAGE', label: '사용 빈도 낮음' },
  { id: 'COMPETITOR', label: '경쟁 서비스 이용' },
  { id: 'OTHER', label: '기타' },
]
export type WiTH_DRAW_LABEL = (typeof WiTH_DRAW_REASON)[number]['label']

// ========== 주의사항 항목들 상수 ==========

export const WITH_DRAW_ALERT_LIST = [
  '등록한 모든 상품이 삭제됩니다',
  '거래 내역과 채팅 기록이 모두 삭제됩니다',
  '찜한 상품 목록이 삭제됩니다',
  '진행 중인 거래가 있다면 먼저 완료해 주세요',
]

export const PRODUCT_DELETE_ALERT_LIST = ['삭제된 상품은 복구할 수 없습니다']

export const PASSWORD_UPDATE_ALERT_LIST = [
  '영문 대/소문자, 숫자, 특수문자를 조합하세요',
  '개인정보(이름, 생일 등)는 사용하지 마세요',
  '다른 사이트와 같은 비밀번호를 사용하지 마세요',
]
