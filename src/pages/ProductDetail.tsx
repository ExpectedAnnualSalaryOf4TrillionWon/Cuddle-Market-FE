import ProductCard from '@layout/ProductCard';
import { BsChat } from 'react-icons/bs';
import { FaHeart } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

const product = {
  id: '1',
  title: '로얄캐닌 강아지 사료 15kg (유통기한 6개월 남음)',
  price: '45,000원',
  originalPrice: '89,000원',
  location: '서울 강남구',
  timeAgo: '2시간 전',
  condition: '거의새것',
  petType: '강아지',
  category: '사료/간식',
  viewCount: 156,
  likeCount: 23,
  isLiked: true,
  tradeStatus: 'available' as 'available' | 'trading' | 'reserved' | 'sold',
  images: [
    'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=600&fit=crop',
  ],
  description: `로얄캐닌 골든리트리버 어덜트 사료 15kg 판매합니다.

구매한지 2주 정도 되었고, 포장만 뜯었습니다.
저희 강아지가 잘 안먹어서 다른 사료로 바꾸게 되어 판매합니다.

유통기한: 2025년 12월까지 (6개월 이상 남음)
정가: 89,000원
판매가: 45,000원 (50% 할인)

직거래 우선이며, 택배도 가능합니다.
궁금한 점 있으시면 채팅 주세요!`,
  seller: {
    name: '멍멍이아빠',
    profileImage:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    rating: 4.8,
    reviewCount: 127,
    responseRate: 98,
    responseTime: '1시간 이내',
    joinDate: '2023년 3월',
  },
};

const relatedProducts = [
  {
    id: '2',
    title: '힐스 강아지 사료 7.5kg',
    price: '38,000원',
    location: '서울 강남구',
    timeAgo: '1일 전',
    condition: '새상품',
    petType: '강아지',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop',
  },
  {
    id: '3',
    title: '오리젠 퍼피 사료 11.4kg',
    price: '52,000원',
    location: '서울 서초구',
    timeAgo: '3일 전',
    petType: '강아지',
    condition: '거의새것',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop',
  },
  {
    id: '4',
    title: '아카나 어덜트 독 사료 6kg',
    price: '28,000원',
    location: '경기 성남시',
    timeAgo: '5일 전',
    condition: '사용감있음',
    petType: '강아지',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop',
  },
];

const ProductDetail = () => {
  const { id } = useParams();
  console.log(id);

  // 거래 상태별 토큰 매핑
  const getTradeStatusInfo = (status: 'available' | 'trading' | 'reserved' | 'sold') => {
    switch (status) {
      case 'available':
        return { text: '판매중', className: 'bg-sale text-bg border-sale' };
      case 'trading':
        return { text: '거래중', className: 'bg-dark text-bg border-dark' };
      case 'reserved':
        return { text: '예약중', className: 'bg-reserved text-bg border-reserved' };
      case 'sold':
        return { text: '판매완료', className: 'bg-complete text-bg border-complete' };
      default:
        return { text: '판매중', className: 'bg-sale text-bg border-sale' };
    }
  };

  const tradeStatusInfo = getTradeStatusInfo(product.tradeStatus);
  const isAvailable = product.tradeStatus === 'available';

  return (
    <div className="min-h-screen">
      <div className="max-w-[var(--container-max-width)] mx-auto px-lg py-md tablet:py-xl">
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-xl">
          {/* 이미지 갤러리 */}
          <div className="flex flex-col gap-lg">
            <div className="relative overflow-hidden rounded-xl bg-bg">
              <img src={product.images[0]} alt={product.title} className="block w-full h-auto" />
              {!isAvailable && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className={`px-md py-xs rounded-xl border ${tradeStatusInfo.className}`}>
                    {tradeStatusInfo.text}
                  </span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-4 gap-sm">
              {product.images.slice(1).map((image, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-lg bg-bg cursor-pointer hover:opacity-75 transition-opacity"
                >
                  <img src={image} alt={product.title} className="block w-full h-auto" />
                </div>
              ))}
            </div>

            {/* 판매자 정보 */}
            <div className="flex flex-col gap-md rounded-xl p-xl bg-secondary/50">
              <div className="flex items-center gap-sm mb-sm">
                <div className="w-12 h-12 overflow-hidden rounded-full">
                  <img
                    src={product.seller.profileImage}
                    alt={product.seller.name}
                    className="block w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-text-primary font-medium">{product.seller.name}</h3>
                  <p className="text-text-secondary bodySmall">{product.location}</p>
                </div>
              </div>
              <button className="w-full rounded-xl p-xs border border-border bg-bg/50">
                판매자 정보보기
              </button>
            </div>
          </div>

          {/* 상품 정보 */}
          <div className="flex flex-col gap-xl">
            <div className="flex flex-col gap-lg">
              {/* 카테고리/상태 칩 */}
              <div className="flex items-center gap-xs">
                <span
                  className={`inline-flex items-center text-md px-md py-xs rounded-xl border ${tradeStatusInfo.className}`}
                >
                  {tradeStatusInfo.text}
                </span>
                <span className="text-sm px-md py-xs rounded-xl bg-secondary/40">
                  {product.petType}
                </span>
                <span className="text-sm px-md py-xs rounded-xl bg-secondary/40">
                  {product.category}
                </span>
                <span className="text-sm px-md py-xs rounded-xl bg-secondary/40">
                  {product.condition}
                </span>
              </div>

              {/* 제목/가격/메타 */}
              <div className="flex flex-col gap-sm">
                <h1 className="heading3 text-text-primary">{product.title}</h1>
                <span
                  className={`text-3xl font-bold ${isAvailable ? 'text-primary' : 'text-complete'}`}
                >
                  {product.price}
                </span>
                <div className="flex items-center gap-lg text-text-secondary bodySmall">
                  <div className="flex items-center gap-1">
                    <span>{product.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>{product.timeAgo}</span>
                  </div>
                  <span>조회 {product.viewCount}</span>
                  <span>찜 {product.likeCount}</span>
                </div>
              </div>
            </div>

            {/* 상품 설명 */}
            <div>
              <h3 className="heading5 text-text-primary mb-sm">상품 설명</h3>
              <div className="rounded-lg p-lg bg-secondary/50 text-text-secondary whitespace-pre-line">
                {product.description}
              </div>
            </div>

            {/* 액션 버튼 */}
            <div className="flex gap-sm">
              <button
                className="
                  flex-1 flex items-center justify-center gap-sm
                  rounded-xl p-sm
                  border border-border
                  bg-dark text-bg
                  transition-colors
                "
              >
                <BsChat size={16} />
                <span>채팅하기</span>
              </button>
              <button
                className="
                  flex-1 flex items-center justify-center gap-sm
                  rounded-xl p-sm
                  border border-border
                  bg-bg
                  text-text-primary
                  transition-colors
                "
              >
                <FaHeart size={16} className="text-alert" />
                <span>찜하기</span>
              </button>
            </div>
          </div>
        </div>

        {/* 관련 상품 */}
        <div className="mt-4xl">
          <h2 className="heading4 text-text-primary mb-lg">{product.seller.name}님의 다른 상품</h2>
          <div className="grid grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4 gap-lg">
            {relatedProducts.map(rp => (
              <ProductCard key={rp.id} {...rp} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
