// MSW 핸들러 전체 주석 처리 - state_name, city_name, seller_products 등 deprecated 속성 사용
export const handlers: any[] = [];

// import { LOCATIONS, PETS, PRODUCT_CATEGORIES } from '../constants/constants';
// import { mockProducts } from './data/products';
// // http: HTTP 요청(GET, POST 등)을 처리하는 도구
// // HttpResponse: 응답을 만들어주는 도구
// import { http, HttpResponse, passthrough } from 'msw';
// import type { Product, User } from 'src/types';
// import { mockUsers } from './data/users';

// // mockProducts 원소 타입을 그대로 가져오기
// type MockProduct = (typeof mockProducts)[number];
// const getProductById = (id: number): MockProduct | undefined => mockProducts.find(p => p.id === id);

// const API_STATUS = {
//   AUTH: true, // 카카오 인증 - 실제 API 사용
//   PROFILE: true, // 프로필 완성 - 실제 API 사용
//   CATEGORIES: true, // 카테고리 - 실제 API 사용
//   LIKES: true, // 찜하기 - 실제 API 사용
//   PRODUCTS: true, // 상품 목록 - 아직 모킹
//   PRODUCT_DETAIL: true, // 상품 상세 - 아직 모킹
//   MY_PAGE: true, // 상품 상세 - 아직 모킹
// };

// export const handlers = [
//   http.post('*/users/kakao-auth/', async () => {
//     if (API_STATUS.AUTH) {
//       return passthrough();
//     }

//     const mockUser: User = {
//       id: 999,
//       email: 'test@kakao.com',
//       nickname: '테스트유저',
//       name: '홍길동',
//       addressSido: '서울특별시',
//       addressGugun: '강남구',
//       birthDate: '1990-01-01',
//       profile_completed: false, // 신규 회원은 false
//       profile_image: '',
//     };

//     return HttpResponse.json(
//       {
//         access: 'mock_access_token_' + Date.now(),
//         user: mockUser,
//       },
//       { status: 200 },
//     );
//   }),

//   http.post('*/users/profile-complete/', async ({ request }) => {
//     if (API_STATUS.PROFILE) {
//       return passthrough();
//     }
//     const body = (await request.json()) as {
//       nickname: string;
//       name: string;
//       birthday: string;
//       state_name: string;
//       city_name: string;
//     };

//     const errors: Record<string, string[]> = {};

//     // 닉네임 검증
//     if (!body.nickname) {
//       errors.nickname = ['닉네임을 입력해주세요.'];
//     } else if (body.nickname.length < 2) {
//       errors.nickname = ['닉네임은 2글자 이상이어야 합니다.'];
//     } else if (body.nickname.length > 12) {
//       errors.nickname = ['닉네임은 12글자 이하여야 합니다.'];
//     } else if (body.nickname === '중복닉네임' || body.nickname === '테스트유저') {
//       errors.nickname = ['이미 사용중인 닉네임입니다.'];
//     }

//     // 이름 검증
//     if (!body.name) {
//       errors.name = ['이름을 입력해주세요.'];
//     } else if (body.name.length < 2) {
//       errors.name = ['이름은 2글자 이상이어야 합니다.'];
//     } else if (body.name.length > 15) {
//       errors.name = ['이름은 15글자 이하여야 합니다.'];
//     }

//     // 생년월일 검증
//     if (!body.birthday) {
//       errors.birthday = ['생년월일을 입력해주세요.'];
//     } else {
//       const birthDate = new Date(body.birthday);
//       const today = new Date();
//       const age = today.getFullYear() - birthDate.getFullYear();

//       if (birthDate > today) {
//         errors.birthday = ['생년월일이 올바르지 않습니다.'];
//       } else if (age < 14) {
//         errors.birthday = ['만 14세 이상만 가입 가능합니다.'];
//       } else if (age > 120) {
//         errors.birthday = ['생년월일을 확인해주세요.'];
//       }
//     }
//     // 지역 검증
//     if (!body.state_name) {
//       errors.state_name = ['시/도를 선택해주세요.'];
//     }
//     if (!body.city_name) {
//       errors.city_name = ['구/군을 선택해주세요.'];
//     }

//     if (Object.keys(errors).length > 0) {
//       return HttpResponse.json(errors, { status: 400 });
//     }
//     const state = LOCATIONS.find(location => location.code === body.state_name);
//     const city = state?.cities.find(city => city.code === body.city_name);

//     return HttpResponse.json(
//       {
//         id: 999,
//         email: 'test@kakao.com',
//         nickname: body.nickname,
//         name: body.name,
//         birthDate: body.birthday,
//         addressSido: state?.name || '',
//         addressGugun: city?.name || '',
//         profile_completed: true,
//         profile_image:
//           'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
//       },
//       { status: 200 },
//     );
//   }),

//   http.get('*/categories/all-get*', () => {
//     if (API_STATUS.CATEGORIES) {
//       return passthrough();
//     }

//     const mockFilterData = {
//       petTypes: PETS.map(petType => ({
//         code: petType.code,
//         name: petType.name,
//         details: petType.details.map(detail => ({
//           code: detail.code,
//           name: detail.name,
//         })),
//       })),
//       categories: PRODUCT_CATEGORIES.map(category => ({
//         code: category.code,
//         name: category.name,
//       })),
//       locations: LOCATIONS.map(location => ({
//         code: location.code,
//         name: location.name,
//         cities: location.cities.map(city => ({
//           code: city.code,
//           name: city.name,
//         })),
//       })),
//     };
//     return HttpResponse.json(mockFilterData, { status: 200 });
//   }),

//   // 프로필 수정
//   http.patch('*/users/mypage*', async ({ request }) => {
//     if (API_STATUS.MY_PAGE) {
//       return passthrough();
//     }

//     const formData = await request.formData();

//     // FormData에서 값 추출
//     const nickname = formData.get('nickname') as string;
//     const state = formData.get('state') as string;
//     const city = formData.get('city') as string;

//     console.log('[MSW] 프로필 수정:', { nickname, state, city });

//     // 모의 응답 - 업데이트된 user 객체 반환
//     const updatedUser = {
//       id: 3,
//       nickname: nickname,
//       addressSido: state,
//       addressGugun: city,
//     };

//     return HttpResponse.json({
//       user: updatedUser,
//       message: '프로필이 수정되었습니다.',
//     });
//   }),

//   // 내가 찜한 상품 조회
//   http.get('*/likes*', () => {
//     if (API_STATUS.LIKES) {
//       return passthrough();
//     }
//     const myPageData = {
//       liked_product_list: mockProducts.slice(3),
//     };

//     return HttpResponse.json(myPageData);
//   }),

//   // 찜하기 추가
//   http.post('*/likes*', async ({ request }) => {
//     if (API_STATUS.LIKES) {
//       return passthrough();
//     }
//     try {
//       const body = (await request.json()) as { product_id?: number };
//       const id = Number(body?.product_id);
//       console.log('클릭된 상품의 id:', id);

//       if (!Number.isFinite(id) || id <= 0) {
//         return new HttpResponse('product_id required', { status: 400 });
//       }

//       const producted = getProductById(id);

//       if (!producted) {
//         return new HttpResponse('Product not found', { status: 404 });
//       }

//       if (!producted.is_liked) {
//         producted.is_liked = true;
//         producted.like_count = (producted.like_count ?? 0) + 1;
//       }
//       console.log(producted);
//       return HttpResponse.json(
//         { product_ids: mockProducts.filter(p => p.is_liked).map(p => p.id) },
//         { status: 201 },
//       );
//     } catch {
//       return new HttpResponse('Bad Request', { status: 400 });
//     }
//   }),

//   // 핵심: MSW 핸들러 순서가 중요합니다. /products/:id를 /products보다 먼저 정의해야 합니다.
//   //  상품 상세 조회 핸들러 추가
//   http.get('*/products/:id', ({ params }) => {
//     if (API_STATUS.PRODUCT_DETAIL) {
//       return passthrough();
//     }
//     const { id } = params;
//     const productId = parseInt(id as string);

//     // mockProducts에서 해당 상품 찾기
//     const product = mockProducts.find(product => product.id === productId);

//     if (!product) {
//       return HttpResponse.json({ error: '상품을 찾을 수 없습니다.' }, { status: 404 });
//     }

//     // 조회수 증가 시뮬레이션
//     const productDetail = {
//       ...product,
//       // 추가 이미지들
//       sub_images: [
//         'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=600&fit=crop',
//         'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=600&fit=crop',
//         'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=600&fit=crop',
//       ].filter(Boolean),
//     };

//     return HttpResponse.json(productDetail);
//   }),

//   // 상품 목록 조회
//   http.get('*/products*', ({ request }) => {
//     if (API_STATUS.PRODUCTS) {
//       return passthrough();
//     }
//     const url = new URL(request.url);
//     const pet_type_detail_code = url.searchParams.get('pet_type_detail_code');
//     // 반려동물 종류 필터링
//     let filteredProducts = mockProducts;
//     if (pet_type_detail_code && pet_type_detail_code !== 'ALL') {
//       filteredProducts = mockProducts.filter(
//         product => product.pet_type_detail_code === pet_type_detail_code,
//       );
//     }

//     return HttpResponse.json(filteredProducts);
//   }),

//   // 판매자 프로필 페이지 조회
//   http.get('*/user/:id', ({ params }) => {
//     const { id } = params;
//     const userId = parseInt(id as string);

//     const user = mockUsers.find(user => user.id === userId);

//     if (!user) {
//       return HttpResponse.json({ error: '사용자를 찾을 수 없습니다.' }, { status: 404 });
//     }

//     const res = { ...user };
//     return HttpResponse.json(res);
//   }),

//   // 내가 찜한 상품과, 내가 등록한 상품 조회
//   http.get('*/users/mypage*', () => {
//     if (API_STATUS.MY_PAGE) {
//       return passthrough();
//     }
//     const myPageData = {
//       my_product_list: mockProducts.slice(0),
//       liked_product_list: mockProducts.slice(3),
//     };

//     return HttpResponse.json(myPageData);
//   }),

//   // 상품 등록
//   http.post('*/products', async ({ request }) => {
//     if (API_STATUS.PRODUCTS) {
//       return passthrough();
//     }
//     const formData = await request.formData();

//     const currentUser: User = {
//       id: 999,
//       name: '강주현',
//       nickname: '테스트유저',
//       birthDate: '1990-01-01',
//       profile_completed: true,
//       profile_image:
//         'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
//       addressSido: '서울특별시',
//       addressGugun: '강남구',
//     };

//     // FormData에서 데이터 추출
//     const newProduct = {
//       id: mockProducts.length + 1, // 임시 ID 생성
//       title: formData.get('title') as string,
//       description: formData.get('description') as string,
//       price: parseInt(formData.get('price') as string),
//       // 이미지 처리 (실제로는 파일 업로드 처리 필요)
//       thumbnail:
//         'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=600&fit=crop',
//       state_code: formData.get('state_code') as string,
//       city_code: formData.get('city_code') as string,
//       category_code: formData.get('category_code') as string,
//       pet_type_code: formData.get('pet_type_code') as string,
//       pet_type_detail_code: formData.get('pet_type_detail_code') as string,
//       condition_status: formData.get('condition_status') as 'MINT' | 'EXCELLENT' | 'GOOD' | 'FAIR',

//       // 기본값 설정
//       transaction_status: 'SELLING' as const,
//       view_count: 0,
//       like_count: 0,
//       elapsed_time: '2025-08-16T08:00:00Z',
//       is_liked: false,
//       seller_info: currentUser,
//     };

//     // 유효성 검사
//     if (!newProduct.title || !newProduct.description || !newProduct.price) {
//       return HttpResponse.json({ error: '필수 항목을 모두 입력해주세요.' }, { status: 400 });
//     }

//     // 실제로는 DB에 저장
//     // 여기서는 mockProducts 배열에 추가 (실제로는 서버 메모리에만 존재)
//     mockProducts.push(newProduct);

//     console.log('[MSW] 새 상품 등록:', newProduct);

//     return HttpResponse.json(
//       {
//         id: newProduct.id,
//         message: '상품이 성공적으로 등록되었습니다.',
//         product: newProduct,
//       },
//       { status: 201 },
//     );
//   }),

//   // 상품 수정 핸들러
//   http.patch('*/products/:id', async ({ params, request }) => {
//     const { id } = params;
//     const productId = parseInt(id as string);
//     const formData = await request.formData();

//     // 기존 상품 찾기
//     const existingProductIndex = mockProducts.findIndex(p => p.id === productId);

//     if (existingProductIndex === -1) {
//       return HttpResponse.json({ error: '상품을 찾을 수 없습니다.' }, { status: 404 });
//     }

//     // 수정된 데이터로 업데이트 (PATCH이므로 부분 업데이트)
//     // Partial<Product> : 타입 T의 모든 속성을 선택적(optional)으로 만듭니다.
//     const updates: Partial<Product> = {};
//     const fields = [
//       'title',
//       'description',
//       'pet_type_code',
//       'pet_type_detail_code',
//       'category_code',
//       'condition_status',
//       'state_code',
//       'city_code',
//     ];

//     fields.forEach(field => {
//       const value = formData.get(field);
//       if (value !== null) {
//         (updates as Record<string, string>)[field] = value.toString();
//       }
//     });

//     // price는 별도 처리
//     const price = formData.get('price');
//     if (price !== null) updates.price = parseInt(price.toString());

//     const updatedProduct = {
//       ...mockProducts[existingProductIndex],
//       ...updates,
//       elapsed_time: new Date().toISOString(),
//     };

//     // 배열에서 업데이트
//     mockProducts[existingProductIndex] = updatedProduct;

//     console.log('[MSW] 상품 수정:', updatedProduct);

//     return HttpResponse.json({
//       id: productId,
//       message: '상품이 성공적으로 수정되었습니다.',
//       product: updatedProduct,
//     });
//   }),
// ];
