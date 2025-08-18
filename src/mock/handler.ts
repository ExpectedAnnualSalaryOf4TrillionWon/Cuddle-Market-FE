import { mockProducts } from './data/products';

// http: HTTP 요청(GET, POST 등)을 처리하는 도구
// HttpResponse: 응답을 만들어주는 도구
import { http, HttpResponse } from 'msw';
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
  http.get('/api/users/mypage', () => {
    const myPageData = {
      my_product_list: mockProducts.slice(0, 3),
      liked_product_list: mockProducts.slice(3, 6),
    };

    return HttpResponse.json(myPageData);
  }),
  http.post('/api/v1/likes', async ({ request }) => {
    const body = (await request.json()) as { product_id: number };
    const productId = body.product_id;

    console.log(`[MSW] 찜하기 추가 요청 - 상품 ID: ${productId}`);

    // 상품이 존재하는지 확인
    const product = mockProducts.find(p => p.id === productId);
    if (!product) {
      return HttpResponse.json(
        {
          error: '상품을 찾을 수 없습니다.',
          product_id: productId,
        },
        { status: 404 },
      );
    }
  }),
];
