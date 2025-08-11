import ProductCard from '@layout/ProductCard';
import { useNavigate } from 'react-router-dom';
import bowl from '../../public/assets/images/bowl.jpg';
const Home = () => {
  const navigate = useNavigate();

  const goToProductDetail = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log(e);
    navigate(`/detail/${1}`);
  };
  return (
    <div>
      <div className="max-w-[var(--container-max-width)] mx-auto px-lg py-md tablet:py-xl">
        {/* 탭 */}
        <div className="flex flex-col gap-sm w-full">
          <div className="grid grid-cols-3 items-center justify-center w-full mb-lg tablet:mb-xl p-sm rounded-xl bg-secondary">
            <button className="bg-dark flex-1 items-center justify-center h-[calc(100%-1px)] gap-sm px-sm py-xs rounded-xl border border-transparent bodySmall font-medium text-text-primary whitespace-nowrap focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary/50 transition-[color,box-shadow] data-[state=active]:bg-bg hover:bg-primary/10">
              전체상품
            </button>
            <button className=" flex-1 items-center justify-center h-[calc(100%-1px)] gap-sm px-sm py-xs rounded-xl border border-transparent bodySmall font-medium text-text-primary whitespace-nowrap focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary/50 transition-[color,box-shadow] data-[state=active]:bg-bg hover:bg-primary/10">
              판매
            </button>
            <button className=" flex-1 items-center justify-center h-[calc(100%-1px)] gap-sm px-sm py-xs rounded-xl border border-transparent bodySmall font-medium text-text-primary whitespace-nowrap focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary/50 transition-[color,box-shadow] data-[state=active]:bg-bg hover:bg-primary/10">
              판매요청
            </button>
          </div>
        </div>

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
