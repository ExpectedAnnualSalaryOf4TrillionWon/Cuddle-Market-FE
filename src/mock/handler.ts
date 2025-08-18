import { mockProducts } from './data/products';

// http: HTTP 요청(GET, POST 등)을 처리하는 도구
// HttpResponse: 응답을 만들어주는 도구
import { http, HttpResponse } from 'msw';
import type { ProductDetailItem } from 'src/types';
import { mockUsers } from './data/users';

export const handlers = [
  // 상품 목록 조회
  http.get('/api/products', ({ request }) => {
    // ({ request }): 요청 정보를 request라는 이름으로 받아옵니다

    // console.log(request);
    /** 실행순서5️⃣ :
    { method: 'GET',
      url: 'http://localhost:5173/api/products?page=1&limit=12', 
      headers: Headers, 
      destination: '',
      referrer: 'http://localhost:5173/', …} */

    // new URL(): 주소를 분석하기 쉽게 만듦
    // 예: http://localhost:3000/api/products?page=2&limit=10를 객체로 만듦

    const url = new URL(request.url);
    // console.log(request.url); //localhost:5173/api/products?page=1&limit=12 // 실행순서6️⃣

    // searchParams.get('pet_type_code'): ?pet_type_code=DOG 같은 값을 추출. 만약 pet_type_code 파라미터가 없으면 null을 반환합니다.
    const pet_type_code = url.searchParams.get('pet_type_code');
    // console.log(pet_type_code);

    // 반려동물 종류 필터링
    let filteredProducts = mockProducts;
    if (pet_type_code && pet_type_code !== 'ALL') {
      filteredProducts = mockProducts.filter(product => product.pet_type_code === pet_type_code);
      // console.log(filteredProducts);
    }
    // console.log(filteredProducts); // 실행순서7️⃣: 전체 상품목록

    return HttpResponse.json(filteredProducts);
  }),

  //  상품 상세 조회 핸들러 추가
  http.get('/api/products/:id', ({ params }) => {
    const { id } = params;
    const productId = parseInt(id as string);

    // mockProducts에서 해당 상품 찾기
    const product = mockProducts.find(product => product.id === productId);
    console.log(product);

    if (!product) {
      return HttpResponse.json({ error: '상품을 찾을 수 없습니다.' }, { status: 404 });
    }

    // 조회수 증가 시뮬레이션
    const productDetail = {
      ...product,
      // 추가 이미지들
      sub_images: [
        'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=600&fit=crop',
      ].filter(Boolean),
    };

    return HttpResponse.json(productDetail);
  }),

  // 판매자 프로필 페이지 조회
  http.get('/api/user/:id', ({ params }) => {
    const { id } = params;
    const userId = parseInt(id as string);

    const user = mockUsers.find(user => user.id === userId);

    if (!user) {
      return HttpResponse.json({ error: '사용자를 찾을 수 없습니다.' }, { status: 404 });
    }

    const res = { ...user, total_products: user.seller_products.length };
    return HttpResponse.json(res);
  }),

  // 마이 페이지 조회
  http.get('/api/mypage', ({}) => {
    // const { id } = params;
    // const userId = parseInt(id as string);
    // console.log(userId);

    // 임시로 mockProducts에서 일부 상품만 반환
    const myInfo = {
      id: 999,
      nickname: '테스트유저',
      profile_image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      email: 'test@example.com',
      state: '서울특별시',
      city: '강남구',
      created_at: '2024-01-15T00:00:00Z',
    };
    return HttpResponse.json(myInfo);
  }),

  // 판매 페이지 조회
  http.get('/api/users/mypage', () => {
    const myPageData = {
      my_product_list: mockProducts.slice(0, 3),
      liked_product_list: mockProducts.slice(3, 6),
    };

    return HttpResponse.json(myPageData);
  }),

  // 상품 등록
  http.post('/api/products', async ({ request }) => {
    const formData = await request.formData();

    // FormData에서 데이터 추출
    const newProduct = {
      id: mockProducts.length + 1, // 임시 ID 생성
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      price: parseInt(formData.get('price') as string),
      // 이미지 처리 (실제로는 파일 업로드 처리 필요)
      images: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=600&fit=crop',
      state_code: formData.get('state_code') as string,
      city_code: formData.get('city_code') as string,
      category_code: formData.get('category_code') as string,
      pet_type_code: formData.get('pet_type_code') as string,
      pet_type_detail_code: formData.get('pet_type_detail_code') as string,

      condition_status: formData.get('condition_status') as
        | '새 상품'
        | '거의 새것'
        | '사용감 있음'
        | '수리 필요',

      // 기본값 설정
      transaction_status: '판매중' as const,
      view_count: 0,
      like_count: 0,
      elapsed_time: '2025-08-16T08:00:00Z',
      is_liked: false,
      seller_info: {
        id: 999,
        nickname: '테스트유저',
        profile_image:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
        state: formData.get('state_code') as string,
        city: formData.get('city_code') as string,
        created_at: new Date().toISOString(),
      },
    };

    // 유효성 검사
    if (!newProduct.title || !newProduct.description || !newProduct.price) {
      return HttpResponse.json({ error: '필수 항목을 모두 입력해주세요.' }, { status: 400 });
    }

    // 실제로는 DB에 저장
    // 여기서는 mockProducts 배열에 추가 (실제로는 서버 메모리에만 존재)
    mockProducts.push(newProduct);

    console.log('[MSW] 새 상품 등록:', newProduct);

    return HttpResponse.json(
      {
        id: newProduct.id,
        message: '상품이 성공적으로 등록되었습니다.',
        product: newProduct,
      },
      { status: 201 },
    );
  }),

  // 상품 수정 핸들러
  http.patch('/api/products/:id', async ({ params, request }) => {
    const { id } = params;
    const productId = parseInt(id as string);
    const formData = await request.formData();

    // 기존 상품 찾기
    const existingProductIndex = mockProducts.findIndex(p => p.id === productId);

    if (existingProductIndex === -1) {
      return HttpResponse.json({ error: '상품을 찾을 수 없습니다.' }, { status: 404 });
    }

    // 수정된 데이터로 업데이트 (PATCH이므로 부분 업데이트)
    const updatedProduct: ProductDetailItem = {
      ...mockProducts[existingProductIndex],
      title: (formData.get('title') as string) || mockProducts[existingProductIndex].title,
      description:
        (formData.get('description') as string) || mockProducts[existingProductIndex].description,
      price: formData.has('price')
        ? parseInt(formData.get('price') as string)
        : mockProducts[existingProductIndex].price,
      pet_type_code:
        (formData.get('pet_type_code') as string) ||
        mockProducts[existingProductIndex].pet_type_code,
      pet_type_detail_code:
        (formData.get('pet_type_detail_code') as string) ||
        mockProducts[existingProductIndex].pet_type_detail_code,
      category_code:
        (formData.get('category_code') as string) ||
        mockProducts[existingProductIndex].category_code,
      condition_status:
        (formData.get('condition_status') as '새 상품' | '거의 새것' | '사용감 있음') ||
        mockProducts[existingProductIndex].condition_status,
      state_code:
        (formData.get('state_code') as string) || mockProducts[existingProductIndex].state_code,
      city_code:
        (formData.get('city_code') as string) || mockProducts[existingProductIndex].city_code,
      // 수정 시간 업데이트
      elapsed_time: new Date().toISOString(),
    };

    // 배열에서 업데이트
    mockProducts[existingProductIndex] = updatedProduct;

    console.log('[MSW] 상품 수정:', updatedProduct);

    return HttpResponse.json({
      id: productId,
      message: '상품이 성공적으로 수정되었습니다.',
      product: updatedProduct,
    });
  }),
];
