import ConfirmModal from '@common/confirmModal';
import ProductCard from '@layout/ProductCard';
import { useUserStore } from '@store/userStore';
import { useEffect, useState } from 'react';
import { BsBoxSeam, BsChat } from 'react-icons/bs';
import { CiClock2, CiLocationOn } from 'react-icons/ci';
import { FaHeart } from 'react-icons/fa';
import { GoHeart } from 'react-icons/go';
import { SlEye } from 'react-icons/sl';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProductById } from '../api/products';
import { LOCATIONS, PETS, PRODUCT_CATEGORIES, stateStyleMap } from '../constants/constants';
import type { ProductDetailItem } from '../types';
const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL;

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

const getLocationName = (stateCode: string, cityCode?: string) => {
  const state = LOCATIONS.find(loc => loc.code === stateCode);
  if (!state) return { stateName: stateCode, cityName: cityCode };

  const stateName = state.name;
  const cityName = cityCode
    ? state.cities.find(city => city.code === cityCode)?.name || cityCode
    : '';

  return { stateName, cityName };
};

// 펫 타입 세부 코드를 한글로 변환
const getPetTypeName = (petTypeCode: string, petDetailCode: string) => {
  const petType = PETS.find(pet => pet.code === petTypeCode);
  if (!petType) return petDetailCode;

  const detail = petType.details.find(d => d.code === petDetailCode);
  return detail?.name || petDetailCode;
};

// 카테고리 코드를 한글로 변환
const getCategoryName = (categoryCode: string) => {
  const category = PRODUCT_CATEGORIES.find(cat => cat.code === categoryCode);
  return category?.name || categoryCode;
};

const ProductDetail = () => {
  const [product, setProduct] = useState<ProductDetailItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [subMessage, setSubMessage] = useState('');
  const [isLiked, setIsLiked] = useState(product?.is_liked || false);
  const { user, accessToken, redirectUrl, setRedirectUrl } = useUserStore();

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  console.log(isLiked); // false

  const toggleLike = async (e?: React.MouseEvent) => {
    e?.stopPropagation();

    if (!product) {
      console.error('Product is not loaded');
      return;
    }
    console.log(user);
    if (!user || !accessToken) {
      setLoading(false);
      setModalMessage('로그인이 필요한 서비스입니다.');
      setSubMessage('로그인 페이지로 이동하시겠습니까?');
      setIsModalOpen(true);
      return;
    }

    try {
      const newLikedState = !isLiked;
      setIsLiked(newLikedState);
      const response = await fetch(`${API_BASE_URL}/likes/`, {
        method: newLikedState ? 'POST' : 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ product_id: Number(id) }),
      });
      if (!response.ok) {
        setIsLiked(!newLikedState);

        const errorData = await response.json();
        console.error('찜하기 실패:', errorData);

        if (errorData.message?.includes('이미 찜')) {
          setIsLiked(true);
        }
      } else {
        console.log(newLikedState ? '찜하기 성공' : '찜하기 취소 성공');
      }
      if (redirectUrl) {
        const targetUrl = redirectUrl;
        setRedirectUrl(null);
        navigate(targetUrl, { replace: true });
      } else {
        navigate(`/product/${id}`, { replace: true });
      }
    } catch (error) {
      console.error('찜하기 실패:', error);
      setIsLiked(!isLiked);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setLoading(false);
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

  const goToUserPage = () => {
    if (!user) {
      setIsModalOpen(true);
      setModalMessage('로그인이 필요한 서비스입니다.');
    } else {
      const sellerId = product?.seller_info?.id;

      const email = product?.seller_info?.email;
      const useremail = user?.email;
      console.log(email);
      console.log(useremail);

      navigate(`/user/${sellerId}`);
    }
  };

  const handleConfirmLogin = async () => {
    setIsModalOpen(false);
    navigate('/signin');
  };
  const handleCancelLogout = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    console.log(id);
    loadProductDetail();
  }, [id]);

  useEffect(() => {
    if (product) {
      setIsLiked(product.is_liked || false);
    }
  }, [product]);
  // if (isLoading) return <p>로딩중입니다</p>;

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

  const currentStatus = product.transaction_status; // state 변수 제거, currentStatus로 변경
  const productLocation = getLocationName(product.state_code || '', product.city_code || '');
  const petTypeName = getPetTypeName(product.pet_type_code || '', product.pet_type_detail_code);
  const categoryName = getCategoryName(product.category_code || '');

  return (
    <>
      <div className="bg-bg pt-3xl">
        <div className="max-w-[var(--container-max-width)] mx-auto px-lg py-md tablet:py-xl flex flex-col gap-4xl">
          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-xl">
            {/* 이미지 갤러리 */}
            <div className="flex flex-col gap-lg">
              {/* 메인 이미지 */}
              <div className="relative overflow-hidden rounded-xl bg-bg  pb-[100%] ">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-full absolute t-0 l-0 object-cover"
                />
              </div>

              {/* 서브 이미지 */}
              {product.sub_images && product.sub_images.length > 0 && (
                <div className="grid grid-cols-4 gap-sm">
                  {product.sub_images.map((image, idx) => (
                    <div key={idx} className="overflow-hidden rounded-lg bg-bg  ">
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
              {product?.seller_info?.email !== user?.email && (
                <div className="flex flex-col gap-md rounded-xl p-xl bg-secondary/50">
                  <div className="flex items-center gap-sm mb-sm">
                    <div className="w-12 h-12 overflow-hidden rounded-full">
                      <img
                        src={product.seller_info?.profile_image ?? ''}
                        alt={product.seller_info?.nickname}
                        className="block w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-text-primary font-medium">
                        {product.seller_info?.nickname}
                      </h3>
                      <div className="flex items-center gap-xs text-text-secondary bodySmall">
                        <CiLocationOn />
                        <span>
                          {product.seller_info?.state_name} {product.seller_info?.city_name}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={goToUserPage}
                    type="button"
                    className="w-full rounded-xl p-xs border border-border bg-bg/50 cursor-pointer shadow-xs"
                  >
                    판매자 정보보기
                  </button>
                </div>
              )}
            </div>

            {/* 상품 정보 */}
            <div className="flex flex-col gap-xl">
              <div className="flex flex-col gap-lg">
                {/* 카테고리/상태 뱃지 */}
                <div className="flex items-center gap-xs">
                  <span
                    className={`flex items-center text-md px-md py-xs rounded-xl text-bg font-bold
                    ${stateStyleMap[currentStatus]}`}
                  >
                    {currentStatus}
                  </span>
                  <span className="text-sm px-md py-xs rounded-xl bg-dark-point text-white font-bold">
                    {petTypeName}
                  </span>
                  <span className="text-sm px-md py-xs rounded-xl bg-secondary/40 font-bold">
                    {categoryName}
                  </span>
                  <span className="text-sm px-md py-xs rounded-xl bg-secondary/40 font-bold">
                    {product.condition_status}
                  </span>
                </div>

                {/* 제목/가격/메타 */}
                <div className="flex flex-col gap-sm">
                  <h1 className="heading3 text-text-primary font-extrabold">{product.title}</h1>
                  <span className={`text-3xl font-extrabold text-dark`}>
                    {formatPrice(product.price)}
                  </span>
                  <div className="flex items-center gap-lg text-text-secondary bodySmall">
                    <div className="flex items-center gap-1">
                      <CiLocationOn />
                      <span>
                        {productLocation.stateName} {productLocation.cityName}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 bodySmall">
                      <CiClock2 />
                      <span>{getTimeAgo(product.elapsed_time)}</span>
                    </div>

                    <div className="flex items-center gap-1 bodySmall">
                      <SlEye />
                      <span>조회 {product.view_count}</span>
                    </div>

                    <div className="flex items-center gap-1 bodySmall">
                      <span>찜 {product.like_count}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 상품 설명 */}
              <div>
                <h3 className="heading5 text-text-primary mb-sm">상품 설명</h3>
                <div className="rounded-lg p-lg bg-secondary/50 text-text-secondary whitespace-pre-line min-h-[22vh]">
                  {product.description}
                </div>
              </div>

              {/* 액션 버튼 */}
              <div className="flex gap-sm">
                <button
                  className="
                  flex-1 flex items-center justify-center gap-sm
                  rounded-xl p-sm  font-bold
                  bg-dark text-bg shadow-sm
                  cursor-pointer hover:shadow-lg hover:bg-dark-point/30 hover:text-text-primary transition-all duration-300 ease-in-out"
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
                  text-text-primary shadow-xs
                  transition-shadow cursor-pointer hover:shadow-sm hover:shadow-alert duration-300 ease-in-out
                "
                  onClick={toggleLike}
                >
                  {isLiked ? <FaHeart size={16} className="text-alert" /> : <GoHeart size={16} />}
                  <span>{isLiked ? '찜 취소' : '찜 하기'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* 판매자의 다른 상품 - Home.tsx의 visibleProducts 패턴과 유사 */}
          <div className="pb-4xl">
            <h2 className="heading4 text-text-primary mb-lg">
              {product.seller_info?.nickname}님의 다른 상품
            </h2>
            {product.seller_products ? (
              <div className="grid grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4 gap-lg">
                {product.seller_products?.map(sellerProducts => (
                  <ProductCard key={sellerProducts.product_id} data={sellerProducts} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-md items-center border-2 border-dashed border-gray-300 rounded-lg p-7 text-center hover:border-border-400 transition-colors cursor-pointer bg-secondary/30">
                <div className="bg-light w-[100px] h-[100px] rounded-full flex items-center justify-center">
                  <BsBoxSeam size={50} />
                </div>
                <p>등록된 다른 상품이 없어요</p>
                <p className="text-sm">
                  {product.seller_info?.nickname}님이 판매 중인 다른 상품이 아직 없습니다.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <ConfirmModal
        isOpen={isModalOpen}
        message={modalMessage}
        subMessage={subMessage}
        onConfirm={handleConfirmLogin}
        onCancel={handleCancelLogout}
      />
    </>
  );
};

export default ProductDetail;
