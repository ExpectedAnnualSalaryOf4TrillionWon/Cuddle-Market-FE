import ConfirmModal from '@common/confirmModal';
import { PETS } from '@constants/constants';
import { useUserStore } from '@store/userStore';
import React, { useState } from 'react';
import { CiClock2 } from 'react-icons/ci';
import { FaHeart } from 'react-icons/fa';
import { GoHeart } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import type { LikeApiResponse, Product, UserProduct } from '../../types';
export type ProductCardProps = {
  data: Product | UserProduct;
  'data-index'?: number;
  // isLiked: boolean;
  // onToggleLike: () => void;
};

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

const getPetTypeName = (petTypeCode: string, petDetailCode: string) => {
  const petType = PETS.find(pet => pet.code === petTypeCode);
  if (!petType) return petDetailCode;

  const detail = petType.details.find(d => d.code === petDetailCode);

  return detail?.name || petDetailCode;
};

const ProductCard: React.FC<ProductCardProps> = ({
  data,
  'data-index': dataIndex,
  // isLiked,
  // onToggleLike,
}) => {
  if (!data) {
    return null; // 또는 로딩 상태 표시
  }

  const { user, accessToken, redirectUrl, setRedirectUrl } = useUserStore();

  const navigate = useNavigate();

  const {
    id,
    title,
    price,
    images,
    pet_type_code,
    pet_type_detail_code,
    condition_status,
    elapsed_time,
    like_count,
    transaction_status,
  } = data;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL;
  const isSold = transaction_status === '판매완료';
  const isReserved = transaction_status === '예약중';

  const goToProductDetail = () => {
    navigate(`/product/${id}`);
  };

  const handleModalConfirm = () => {
    setIsModalOpen(false);
    // 로그인 페이지로 이동
    navigate('/login');
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const toggleLike = async (e?: React.MouseEvent) => {
    e?.stopPropagation();
    console.log(user);
    if (!user || !accessToken) {
      setIsLoading(false);
      setModalMessage('로그인이 필요한 서비스입니다.\n로그인 페이지로 이동하시겠습니까?');
      setIsModalOpen(true);
      return; // ❹ 로딩에 갇히지 않게 즉시 종료
    }

    console.log(API_BASE_URL);

    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/likes/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ product_id: Number(id) }),
      });

      if (!response.ok) {
        throw new Error('찜하기 실패');
      }
      const data: LikeApiResponse = await response.json();
      console.log('응답 데이터:', data);

      if (redirectUrl) {
        const targetUrl = redirectUrl;
        setRedirectUrl(null); // 사용 후 초기화
        console.log('저장된 페이지로 이동:', targetUrl);
        navigate(targetUrl, { replace: true });
      } else {
        console.log('홈으로 이동');
        navigate('/', { replace: true });
      }
    } catch (error) {
      console.error('찜하기 실패:', error);
      // setErrors({
      //   general: error instanceof Error ? error.message : '회원가입에 실패했습니다.',
      // });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <p>로딩중입니다</p>;

  const petTypeName = getPetTypeName(pet_type_code || '', pet_type_detail_code);
  return (
    <>
      <div
        className="
        flex flex-col overflow-hidden
        border border-border rounded-xl
        bg-bg
        text-text-primary
        cursor-pointer transition-shadow duration-200 hover:shadow-lg
      "
        onClick={goToProductDetail}
        role="button"
        data-index={dataIndex} // 이 줄 추가
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            (e.currentTarget as HTMLDivElement).click();
          }
        }}
      >
        {/* 상품 썸네일 영역 */}
        <div className="relative pb-[75%] overflow-hidden">
          {/* 우측 상단 하트 */}
          <button
            type="button"
            className="
            absolute top-sm right-sm z-1
            flex items-center justify-center
            w-8 h-8
            rounded-md
            border border-border
            bg-bg/80 hover:bg-bg
            transition-all
            cursor-pointer
          "
            onClick={e => {
              e.stopPropagation();
              // TODO: 찜 상태 토글 핸들러 연결
              toggleLike();
            }}
            aria-label="찜하기"
          >
            <FaHeart color="red" />
          </button>
          {/* 상단 좌측 배지 */}
          <div className="absolute top-sm left-sm flex gap-xs z-1">
            <span
              className="
              inline-flex items-center justify-center
              rounded-md px-sm py-0.5
              bg-secondary
              text-caption font-medium whitespace-nowrap
            "
            >
              {petTypeName}
            </span>
            <span
              className="
              inline-flex items-center justify-center
              rounded-md px-sm py-0.5
              border border-border
                bg-secondary
              text-caption font-medium whitespace-nowrap
            "
            >
              {condition_status}
            </span>
          </div>

          <span
            className={`
            absolute bottom-sm right-sm z-1
            flex items-center justify-center
                rounded-md px-sm py-0.5
                border 
                text-caption font-bold whitespace-nowrap
                text-white
                ${
                  isSold
                    ? 'bg-complete border-complete'
                    : isReserved
                    ? 'bg-reserved border-reserved'
                    : 'bg-sale border-sale'
                }
                `}
          >
            {isSold ? '판매완료' : isReserved ? '예약중' : '판매중'}
          </span>

          <img
            src={images || ''}
            alt={title}
            className="w-full h-full absolute t-0 l-0 object-cover"
          />
        </div>

        {/* 상품 정보 영역 */}
        <div className="p-md">
          <h3 className="heading5 text-text-primary mb-xs line-clamp-2 nobreakstyle">{title}</h3>
          <p className="heading5 text-primary font-bold mb-sm">{formatPrice(price)}</p>

          <div className="flex items-center justify-between">
            <div className="flex justify-between w-full gap-xs text-text-secondary caption">
              <div className="flex items-center gap-xs text-text-secondary caption">
                <CiClock2 size={16} />
                <span>{getTimeAgo(elapsed_time)}</span>
              </div>
              <div className="flex items-center gap-xs text-text-secondary caption">
                <GoHeart size={16} />
                <span>{like_count}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConfirmModal
        isOpen={isModalOpen}
        message={modalMessage}
        onConfirm={handleModalConfirm}
        onCancel={handleModalCancel}
      />
    </>
  );
};

export default ProductCard;
