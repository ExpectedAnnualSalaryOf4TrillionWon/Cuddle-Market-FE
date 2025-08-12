import CategoryFilter from '@layout/CategoryFilter';
import ProductCard from '@layout/ProductCard';
import { useNavigate } from 'react-router-dom';
import bowl from '../../public/assets/images/bowl.jpg';
import CategoryFilter from '@layout/CategoryFilter';

const Home = () => {
  const navigate = useNavigate();

  const goToProductDetail = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log(e);
    navigate(`/detail/${1}`);
  };
  return (
    <div>
      <CategoryFilter />

      <div className="max-w-[var(--container-max-width)] mx-auto px-lg py-md tablet:py-xl">
        {/* 탭 */}
        <CategoryFilter />

        {/* 섹션 타이틀 */}
        <div>
          <h2 className="heading4 text-text-primary">전체 상품</h2>
          <p className="mt-xs bodySmall text-text-secondary">총 12개의 상품</p>
        </div>

        <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 gap-md tablet:gap-lg desktop:gap-xl">
          <ProductCard
            id={1}
            title="로얄캐닌 강아지 사료 15kg (유통기한 6개월 남음)"
            price="45,000원"
            location="서울 강남구"
            timeAgo="2시간 전"
            condition="거의새것"
            petType="강아지"
            image={bowl}
            goToProductDetail={goToProductDetail}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
