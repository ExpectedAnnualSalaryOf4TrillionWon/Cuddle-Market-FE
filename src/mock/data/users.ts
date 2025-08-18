import type { UserWithProducts } from 'src/types';

// 판매자 페이지용 데이터
export const mockUsers: UserWithProducts[] = [
  {
    id: 1,
    profile_image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    nickname: '멍멍이 아빠',
    state: '서울특별시',
    city: '서초구',
    created_at: '2025-08-16T08:00:00Z',
    seller_products: [
      {
        id: 123,
        title: '기니피그 케이지 + 하우스 + 급수기',
        price: 20000,
        images: 'https://images.unsplash.com/photo-1548546738-8509cb246ed3?w=400&h=400&fit=crop',
        pet_type_detail_code: '햄스터',
        transaction_status: '판매중',
        condition_status: '거의 새것',
        elapsed_time: '2025-08-08T13:20:00',
        view_count: 5,
      },
      {
        id: 356,
        title: '기니피그 케이지 + 하우스 + 급수기',
        price: 20000,
        images: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop',
        pet_type_detail_code: '햄스터',
        transaction_status: '판매중',
        condition_status: '거의 새것',
        elapsed_time: '2025-08-08T13:20:00',
        view_count: 5,
      },
      // ...더미 추가
    ],
    total_products: 1, // seller_products.length 로 맞추세요
  },
  {
    id: 2,
    profile_image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    nickname: '냥냥이 엄마',
    state: '경기도',
    city: '고양시',
    created_at: '2025-08-16T08:00:00Z',
    seller_products: [
      {
        id: 123,
        title: '기니피그 케이지 + 하우스 + 급수기',
        price: 20000,
        images: 'https://images.unsplash.com/photo-1548546738-8509cb246ed3?w=400&h=400&fit=crop',
        pet_type_detail_code: '햄스터',
        transaction_status: '판매중',
        condition_status: '거의 새것',
        elapsed_time: '2025-08-08T13:20:00',
        view_count: 5,
      },
      {
        id: 356,
        title: '기니피그 케이지 + 하우스 + 급수기',
        price: 20000,
        images: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop',
        pet_type_detail_code: '햄스터',
        transaction_status: '판매중',
        condition_status: '거의 새것',
        elapsed_time: '2025-08-08T13:20:00',
        view_count: 5,
      },
      // ...더미 추가
    ],
    total_products: 1,
  },
];
