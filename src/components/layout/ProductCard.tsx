import React from 'react';
import { CiClock2, CiLocationOn } from 'react-icons/ci';
import { IoIosHeartEmpty } from 'react-icons/io';

export type ProductCardProps = {
  id: string | number;
  title: string;
  price: string;
  location: string;
  timeAgo: string;
  condition: string;
  petType: string;
  image: string;
  goToProductDetail?: React.MouseEventHandler<HTMLDivElement>;
};

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  price,
  location,
  timeAgo,
  condition,
  petType,
  image,
  goToProductDetail,
}) => {
  return (
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
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          (e.currentTarget as HTMLDivElement).click();
        }
      }}
    >
      <div className="relative overflow-hidden">
        {/* 상단 좌측 배지 */}
        <div className="absolute top-sm left-sm flex gap-xs">
          <span
            className="
              inline-flex items-center justify-center
              rounded-md px-sm py-0.5
              bg-secondary
              text-caption font-medium whitespace-nowrap
            "
          >
            {petType}
          </span>
          <span
            className="
              inline-flex items-center justify-center
              rounded-md px-sm py-0.5
              border border-border
              text-caption font-medium whitespace-nowrap
            "
          >
            {condition}
          </span>
        </div>

        {/* 우측 상단 하트 */}
        <button
          type="button"
          className="
            absolute top-sm right-sm
            flex items-center justify-center
            w-8 h-8
            rounded-md
            border border-border
            bg-bg/80 hover:bg-bg
            transition-all
          "
          onClick={e => {
            e.stopPropagation();
            // TODO: 찜 상태 토글 핸들러 연결
          }}
          aria-label="찜하기"
        >
          <IoIosHeartEmpty />
        </button>

        <img src={image} alt={title} className="block w-full h-auto" />
      </div>

      <div className="p-md">
        <h3 className="heading5 text-text-primary mb-xs line-clamp-2">{title}</h3>
        <p className="heading5 text-primary font-bold mb-sm">{price}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-xs text-text-secondary caption">
            <CiLocationOn size={16} />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-xs text-text-secondary caption">
            <CiClock2 size={16} />
            <span>{timeAgo}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
