import { mockProducts } from './data/products';

// http: HTTP 요청(GET, POST 등)을 처리하는 도구
// HttpResponse: 응답을 만들어주는 도구
import { http, HttpResponse } from 'msw';

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
  http.get('/api/detail/:id', ({ params }) => {
    const { id } = params;
    const productId = parseInt(id as string);

    // mockProducts에서 해당 상품 찾기
    const product = mockProducts.find(product => product.id === productId);

    if (!product) {
      return HttpResponse.json({ error: '상품을 찾을 수 없습니다.' }, { status: 404 });
    }

    // 조회수 증가 시뮬레이션
    const productDetail = {
      ...product,
      view_count: product.view_count + 1,
      main_image: product.images,
      // 추가 이미지들
      images: [
        'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=600&fit=crop',
      ].filter(Boolean),
      // 판매자 정보
      // seller: {
      //   id: product.id,
      //   name: `멍멍이아빠${product.user_id}`,
      //   profile_image:
      //     'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      //   rating: 4.5,
      //   review_count: 127,
      //   response_rate: 98,
      //   response_time: '1시간 이내',
      //   join_date: '2023년 3월',
      // },
    };

    return HttpResponse.json(productDetail);
  }),
];
