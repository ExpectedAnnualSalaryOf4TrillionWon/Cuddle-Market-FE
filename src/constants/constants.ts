import type { Category, City, PetType, PetTypeDetail, State } from '../types';

export const states: State[] = [
  {
    id: 1,
    name: '서울특별시',
  },
  {
    id: 2,
    name: '부산광역시',
  },
  {
    id: 3,
    name: '인천광역시',
  },
  {
    id: 4,
    name: '경기도',
  },
  {
    id: 5,
    name: '대구광역시',
  },
];

export const cities: City[] = [
  {
    id: 1,
    name: '강남구',
  },
  {
    id: 2,
    name: '마포구',
  },
  {
    id: 3,
    name: '송파구',
  },
  {
    id: 4,
    name: '종로구',
  },
  {
    id: 5,
    name: '영등포구',
  },
  {
    id: 6,
    name: '해운대구',
  },
  {
    id: 7,
    name: '연수구',
  },
  {
    id: 8,
    name: '성남시',
  },
  {
    id: 9,
    name: '고양시',
  },
  {
    id: 10,
    name: '동구',
  },
];

export const petTypes: PetType[] = [
  {
    id: 1,
    name: '포유류',
  },
  {
    id: 2,
    name: '조류',
  },
  {
    id: 3,
    name: '파충류',
  },
  {
    id: 4,
    name: '수생동물',
  },
  {
    id: 5,
    name: '곤충/절지동물',
  },
];
export const petTypeDetails: PetTypeDetail[] = [
  {
    id: 1,
    name: '강아지',
  },
  {
    id: 2,
    name: '고양이',
  },
  {
    id: 3,
    name: '토끼',
  },
  {
    id: 4,
    name: '햄스터',
  },
  {
    id: 5,
    name: '기니피그',
  },
  {
    id: 6,
    name: '패럿',
  },
  {
    id: 7,
    name: '친칠라',
  },
  {
    id: 8,
    name: '고슴도치',
  },
];
export const categories: Category[] = [
  {
    id: 1,
    name: '전체',
  },
  {
    id: 2,
    name: '급식기/급수기',
  },
  {
    id: 3,
    name: '급식기/급수기',
  },
  {
    id: 4,
    name: '목줄/하네스',
  },
  {
    id: 5,
    name: '장난감/놀이용품',
  },
  {
    id: 6,
    name: '의류/액세서리',
  },
  {
    id: 7,
    name: '케이지/하우스',
  },
  {
    id: 8,
    name: '화장실/위생용품',
  },
  {
    id: 9,
    name: '이동용품',
  },
  {
    id: 10,
    name: '건강/미용',
  },
  {
    id: 11,
    name: '기타',
  },
];

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
