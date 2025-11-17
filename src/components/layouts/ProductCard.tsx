import ConfirmModal from '@src/components/commons/confirmModal';
import { CONDITION_EN_TO_KO, PETS, stateStyleMap, STATUS_EN_TO_KO } from '@constants/constants';
import { useUserStore } from '@store/userStore';
import React, { useState } from 'react';
import { CiClock2 } from 'react-icons/ci';
import { FaHeart } from 'react-icons/fa';
import { GoHeart } from 'react-icons/go';
import { IoIosHeartEmpty } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import bowl from '@assets/images/bowl.jpg';
import type { Product } from '../../types';
const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL;

export type ProductCardProps = {
  data: Product;
  'data-index'?: number;
};

const formatPrice = (price: number): string => {
  return `${Math.floor(price).toLocaleString()}원`;
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
    return `${diffDays}일 전`;
  }
};

const getPetTypeName = (petTypeCode: string, petDetailCode: string) => {
  const petType = PETS.find(pet => pet.code === petTypeCode);
  if (!petType) return petDetailCode;

  const detail = petType.details.find(d => d.code === petDetailCode);

  return detail?.name || petDetailCode;
};

const ProductCard: React.FC<ProductCardProps> = ({ data, 'data-index': dataIndex }) => {
  if (!data) {
    return null;
  }

  const { user, accessToken, redirectUrl, setRedirectUrl } = useUserStore();

  const navigate = useNavigate();

  const {
    id,
    title,
    price,
    thumbnail: images,
    pet_type_code,
    pet_type_detail_code,
    condition_status,
    elapsed_time,
    like_count,
    transaction_status,
  } = data;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [subMessage, setSubMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(data.is_liked || false);
  const currentStatus = STATUS_EN_TO_KO[transaction_status]; //
  const statusClass = stateStyleMap[transaction_status];
  const currentCondition = CONDITION_EN_TO_KO[condition_status]; //

  const goToProductDetail = () => {
    navigate(`/product/${id}`);
  };

  const handleModalConfirm = () => {
    setIsModalOpen(false);
    navigate('/signin');
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const toggleLike = async (e?: React.MouseEvent) => {
    e?.stopPropagation();
    console.log(user);
    if (!user || !accessToken) {
      setIsLoading(false);
      setModalMessage('로그인이 필요한 서비스입니다.');
      setSubMessage('로그인 페이지로 이동하시겠습니까?');
      setIsModalOpen(true);
      return;
    }

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

      const data = await response.json();
      console.log(data); // ['이미 관심 상품으로 추가된 상품입니다.']

      if (response.ok) {
        setIsLiked(true);
      } else if (response.status === 400 || data[0] === '이미 관심 상품으로 추가된 상품입니다.') {
        console.log('여기서 상품 찜하기 취소가 되어야 합니다');

        const deleteResponse = await fetch(`${API_BASE_URL}/likes/`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ product_id: Number(id) }),
        });

        if (deleteResponse.ok) {
          setIsLiked(false);
          console.log('찜하기 삭제 성공');
        }
      }
      if (redirectUrl) {
        const targetUrl = redirectUrl;
        setRedirectUrl(null);
        navigate(targetUrl, { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    } catch (error) {
      console.error('찜하기 실패:', error);
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
        className="group
        flex flex-col overflow-hidden
        border border-border rounded-xl
        bg-bg
        text-text-primary
        cursor-pointer transition-shadow duration-200 hover:shadow-xl
        shadow-md"
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
          <div className="absolute top-sm flex justify-between w-full px-sm">
            {/* 상단 좌측 배지 */}
            <div className="flex gap-xs z-1">
              <span
                className="
              inline-flex items-center justify-center
              rounded-md px-sm py-0.5
              bg-dark-point text-white
              text-caption font-extrabold whitespace-nowrap shadow-md
            "
              >
                {petTypeName}
              </span>
              <span
                className="
              inline-flex items-center justify-center
              rounded-md px-sm py-0.5
                bg-secondary
              text-caption font-extrabold whitespace-nowrap shadow-md
            "
              >
                {currentCondition}
              </span>
            </div>
            {/* 우측 상단 하트 */}
            <button
              type="button"
              className="z-2 flex items-center justify-center w-8 h-8 rounded-full shadow:lg bg-bg/80 hover:bg-bg transition-all cursor-pointer"
              onClick={e => {
                e.stopPropagation();
                toggleLike();
              }}
              aria-label="찜하기"
            >
              {isLiked ? <FaHeart color="red" /> : <IoIosHeartEmpty />}
            </button>
          </div>

          <span
            className={`
            absolute bottom-sm right-sm z-1
            flex items-center justify-center
                rounded-md px-sm py-0.5
                border 
                text-caption font-bold whitespace-nowrap
                text-white
              ${statusClass}
                `}
          >
            {currentStatus}
          </span>

          <img
            src={images || bowl}
            alt={title}
            className="w-full h-full absolute t-0 l-0 object-cover group-hover:scale-105 transition-all duration-300 ease-in-out"
          />
        </div>

        {/* 상품 정보 영역 */}
        <div className="p-md">
          <h3 className="heading5 font-extrabold text-text-primary mb-xs line-clamp-2 nobreakstyle">
            {title}
          </h3>
          <p className="heading5 text-dark font-extrabold mb-sm">{formatPrice(price)}</p>

          <div className="flex items-center justify-between">
            <div className="flex justify-between w-full gap-xs text-text-secondary caption">
              <div className="flex items-center gap-xs text-text-secondary bodySmall">
                <CiClock2 size={16} />
                <span>{getTimeAgo(elapsed_time)}</span>
              </div>
              <div className="flex items-center gap-xs text-text-secondary bodySmall">
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
        subMessage={subMessage}
        onConfirm={handleModalConfirm}
        onCancel={handleModalCancel}
      />
    </>
  );
};

export default ProductCard;
