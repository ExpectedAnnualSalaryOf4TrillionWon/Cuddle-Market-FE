import ProductCard from '@layout/ProductCard';
import { useEffect, useState } from 'react';
import { BsChat } from 'react-icons/bs';
import { CiClock2, CiLocationOn } from 'react-icons/ci';
import { FaHeart } from 'react-icons/fa';
import { GoHeart } from 'react-icons/go';
import { SlEye } from 'react-icons/sl';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProductById } from '../api/products';
import type { Product } from '../types';
type DetailProduct = Product & { sub_images?: string[] };

const ProductDetail = () => {
  const [product, setProduct] = useState<DetailProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const formatPrice = (price: number): string => {
    return `${price.toLocaleString()}원`;
  };

  const getTimeAgo = (createdAt: string): string => {
    const now = new Date();
    const created = new Date(createdAt); // ISO 문자열 파싱
    const diffMs = now.getTime() - created.getTime();

    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMinutes < 1) {
      return '방금 전';
    } else if (diffMinutes < 60) {
      return `${diffMinutes}분 전`;
    } else if (diffHours < 24) {
      return `${diffHours}시간 전`;
    } else {
      // 24시간이 넘으면 무조건 'n일 전'
      return `${diffDays}일 전`;
    }
  };

  // 거래 상태별 토큰 매핑
  const getTradeStatusInfo = (status: Product['transaction_status']) => {
    switch (status) {
      case '판매중':
        return { className: 'bg-sale text-bg border-sale' };
      case '예약중':
        return { className: 'bg-reserved text-bg border-reserved' };
      case '판매완료':
        return { className: 'bg-complete text-bg border-complete' };
      default:
        return { className: 'bg-sale text-bg border-sale' };
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

  const goToUserPage = () => {
    const sellerId = product?.seller_info?.id;

    if (sellerId) {
      navigate(`/user/${sellerId}`);
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

  return (
    <div className="min-h-screen">
      <div className="max-w-[var(--container-max-width)] mx-auto px-lg py-md tablet:py-xl">
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-xl">
          {/* 이미지 갤러리 */}
          <div className="flex flex-col gap-lg">
            {/* 메인 이미지 */}
            <div className="relative overflow-hidden rounded-xl bg-bg  pb-[100%] ">
              <img
                src={product.images}
                alt={product.title}
                className="w-full h-full absolute t-0 l-0 object-cover"
              />
            </div>

            {/* 서브 이미지 */}
            {product.sub_images && product.sub_images.length > 0 && (
              <div className="grid grid-cols-4 gap-sm">
                {product.sub_images.map((image, idx) => (
                  <div
                    key={idx}
                    className="overflow-hidden rounded-lg bg-bg cursor-pointer hover:opacity-75 transition-opacity"
                  >
                    <img
                      src={image}
                      alt={`${product.title} - ${idx + 1}`}
                      className="block w-full h-auto"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* 판매자 정보 */}
            <div className="flex flex-col gap-md rounded-xl p-xl bg-secondary/50">
              <div className="flex items-center gap-sm mb-sm">
                <div className="w-12 h-12 overflow-hidden rounded-full">
                  <img
                    src={product.seller_info?.seller_image ?? ''}
                    alt={product.seller_info?.nickname}
                    className="block w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-text-primary font-medium">{product.seller_info?.nickname}</h3>
                  <div className="flex items-center gap-xs text-text-secondary bodySmall">
                    <CiLocationOn />
                    <span>
                      {product.seller_info?.state} {product.seller_info?.city}
                    </span>
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
              {/* 카테고리/상태 뱃지 */}
              <div className="flex items-center gap-xs">
                <span
                  className={`inline-flex items-center text-md px-md py-xs rounded-xl border ${tradeStatusInfo.className}`}
                >
                  {product.transaction_status}
                </span>
                <span className="text-sm px-md py-xs rounded-xl bg-secondary/40">
                  {product.pet_type_detail_code}
                </span>
                <span className="text-sm px-md py-xs rounded-xl bg-secondary/40">
                  {product.category_code}
                </span>
                <span className="text-sm px-md py-xs rounded-xl bg-secondary/40">
                  {product.condition_status}
                </span>
              </div>

              {/* 제목/가격/메타 */}
              <div className="flex flex-col gap-sm">
                <h1 className="heading3 text-text-primary">{product.title}</h1>
                <span className={`text-3xl font-bold text-primary`}>
                  {formatPrice(product.price)}
                </span>
                <div className="flex items-center gap-lg text-text-secondary bodySmall">
                  <div className="flex items-center gap-1">
                    <CiLocationOn />
                    <span>
                      {product.state_code} {product.city_code}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <CiClock2 />
                    <span>{getTimeAgo(product.elapsed_time)}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <SlEye />
                    <span>조회 {product.view_count}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <GoHeart />
                    <span>찜 {product.like_count}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 상품 설명 */}
            <div>
              <h3 className="heading5 text-text-primary mb-sm">상품 설명</h3>
              <div
                className="rounded-lg p-lg bg-secondary/50 text-text-secondary whitespace-pre-line
              min-h-[22vh]"
              >
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
        {product.seller_products && (
          <div className="mt-4xl">
            <h2 className="heading4 text-text-primary mb-lg">
              {product.seller_info?.nickname}님의 다른 상품
            </h2>
            <div className="grid grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4 gap-lg">
              {product.seller_products?.map(sellerProducts => (
                <ProductCard key={sellerProducts.id} product={sellerProducts} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
