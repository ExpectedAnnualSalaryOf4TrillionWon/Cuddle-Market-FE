import { useEffect, useState } from 'react';
import { BsChat } from 'react-icons/bs';
import { CiClock2, CiLocationOn } from 'react-icons/ci';
import { FaHeart } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProductById } from '../api/products';
import type { Product } from '../types';

const ProductDetail = () => {
  const [product, setProduct] = useState<any>(null);
  const [sellerProducts, setSellerProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const formatPrice = (price: number): string => {
    return `${price.toLocaleString()}원`;
  };

  const getTimeAgo = (createdAt: string): string => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffMs = now.getTime() - created.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMinutes < 60) {
      return `${diffMinutes}분 전`;
    } else if (diffHours < 24) {
      return `${diffHours}시간 전`;
    } else if (diffDays < 7) {
      return `${diffDays}일 전`;
    } else {
      const diffWeeks = Math.floor(diffDays / 7);
      return `${diffWeeks}주일 전`;
    }
  };

  // 상태 텍스트 변환
  const getConditionText = (condition: Product['condition_status']): string => {
    const conditionMap = {
      MINT: '새상품',
      EXCELLENT: '거의새것',
      GOOD: '사용감있음',
      FAIR: '상태나쁨',
    };
    return conditionMap[condition] || condition;
  };

  // 거래 상태별 토큰 매핑
  const getTradeStatusInfo = (status: Product['transaction_status']) => {
    switch (status) {
      case 'SELLING':
        return { text: '판매중', className: 'bg-sale text-bg border-sale' };
      case 'RESERVED':
        return { text: '예약중', className: 'bg-reserved text-bg border-reserved' };
      case 'SOLD':
        return { text: '판매완료', className: 'bg-complete text-bg border-complete' };
      default:
        return { text: '판매중', className: 'bg-sale text-bg border-sale' };
    }
  };

  const loadProductDetail = async () => {
    if (!id) return;

    try {
      setLoading(true);

      // 상품 상세 정보 가져오기
      const productData = await fetchProductById(id);
      console.log(productData);

      setProduct(productData);

      // 판매자의 다른 상품 가져오기
      // if (productData.seller) {
      //   const otherProducts = await fetchSellerProducts(productData.seller.id);
      //   // 현재 상품 제외
      //   const filteredProducts = otherProducts.filter(p => p.id !== productData.id);
      //   setSellerProducts(filteredProducts);
      // }

      setError(null);
    } catch (err) {
      console.error('Error loading product:', err);
      setError(err instanceof Error ? err.message : '오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadProductDetail();
  }, [id]);

  const goToUserPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (product?.user_id) {
      navigate(`/user/${product.user_id}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || '상품을 찾을 수 없습니다.'}</p>
          <button onClick={() => navigate('/')} className="text-blue-600 hover:text-blue-800">
            목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const tradeStatusInfo = getTradeStatusInfo(product.transaction_status);
  const isAvailable = product.transaction_status === 'SELLING';
  return (
    <div className="min-h-screen">
      <div className="max-w-[var(--container-max-width)] mx-auto px-lg py-md tablet:py-xl">
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-xl">
          {/* 이미지 갤러리 */}
          <div className="flex flex-col gap-lg">
            <div className="relative overflow-hidden rounded-xl bg-bg">
              <img src={product.main_image} alt={product.title} className="block w-full h-auto" />
              {!isAvailable && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className={`px-md py-xs rounded-xl border ${tradeStatusInfo.className}`}>
                    {tradeStatusInfo.text}
                  </span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-4 gap-sm">
              {product.images.slice(0).map((image: string, id: number) => (
                <div
                  key={id}
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
                  <div className="flex items-center gap-xs text-text-secondary bodySmall">
                    <CiLocationOn />
                    <span>{product.location}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={goToUserPage}
                type="button"
                className="w-full rounded-xl p-xs border border-border bg-bg/50 cursor-pointer"
              >
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
                    <CiLocationOn />
                    <span>{product.location}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <CiClock2 />
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

        {/* 판매자의 다른 상품 - Home.tsx의 visibleProducts 패턴과 유사 */}
        {/* {sellerProducts.length > 0 && (
          <div className="mt-4xl">
            <h2 className="heading4 text-text-primary mb-lg">
              {product.seller.name}님의 다른 상품
            </h2>
            <div className="grid grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4 gap-lg">
              {sellerProducts.map(item => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default ProductDetail;
