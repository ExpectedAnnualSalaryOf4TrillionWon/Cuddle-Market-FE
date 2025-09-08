import type { User } from 'src/types';

// 판매자 페이지용 데이터
export const mockUsers: User[] = [
  {
    id: 1,
    name: 'ddd',
    profile_image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    birthday: '1990-05-15',
    is_active: true,
    is_staff: false,
    is_superuser: false,
    profile_completed: true,
    last_login: '2025-08-20T10:30:00Z',
    nickname: '멍멍이 아빠',
    state_name: '서울특별시',
    city_name: '서초구',
    created_at: '2025-08-16T08:00:00Z',
    seller_products: [
      {
        id: 123,
        title: '기니피그 케이지 + 하우스 + 급수기',
        price: 20000,
        thumbnail: 'https://images.unsplash.com/photo-1548546738-8509cb246ed3?w=400&h=400&fit=crop',
        pet_type_code: 'MAMMAL',
        pet_type_detail_code: 'HAMSTER',
        transaction_status: 'SELLING',
        condition_status: 'EXCELLENT',
        elapsed_time: '2025-08-08T13:20:00',
        view_count: 5,
        like_count: 10,
      },
      {
        id: 356,
        title: '기니피그 케이지 + 하우스 + 급수기',
        price: 20000,
        thumbnail:
          'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop',
        pet_type_code: 'MAMMAL',
        pet_type_detail_code: 'HAMSTER',
        transaction_status: 'SELLING',
        condition_status: 'EXCELLENT',
        elapsed_time: '2025-08-08T13:20:00',
        view_count: 5,
        like_count: 10,
      },
      // ...더미 추가
    ],
  },
  {
    id: 2,
    name: 'ddd',
    profile_image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    birthday: '1990-05-15',
    is_active: true,
    is_staff: false,
    is_superuser: false,
    profile_completed: true,
    last_login: '2025-08-20T10:30:00Z',
    nickname: '냥냥이 엄마',
    state_name: '경기도',
    city_name: '고양시',
    created_at: '2025-08-16T08:00:00Z',
    seller_products: [
      {
        id: 123,
        title: '기니피그 케이지 + 하우스 + 급수기',
        price: 20000,
        thumbnail: 'https://images.unsplash.com/photo-1548546738-8509cb246ed3?w=400&h=400&fit=crop',
        pet_type_code: 'MAMMAL',
        pet_type_detail_code: 'HAMSTER',
        transaction_status: 'SELLING',
        condition_status: 'EXCELLENT',
        elapsed_time: '2025-08-08T13:20:00',
        view_count: 5,
        like_count: 10,
      },
      {
        id: 356,
        title: '기니피그 케이지 + 하우스 + 급수기',
        price: 20000,
        thumbnail:
          'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop',
        pet_type_code: 'MAMMAL',
        pet_type_detail_code: 'HAMSTER',
        transaction_status: 'SELLING',
        condition_status: 'EXCELLENT',
        elapsed_time: '2025-08-08T13:20:00',
        view_count: 5,
        like_count: 10,
      },
      // ...더미 추가
    ],
  },
];
