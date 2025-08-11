import { IoIosHeartEmpty } from 'react-icons/io';
import bowl from '../../public/assets/images/bowl.jpg';
const Home = () => {
  return (
    <div className="bg-primary/20">
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

        {/* 그리드 */}
        <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 gap-md tablet:gap-lg desktop:gap-xl">
          {/* 카드 */}
          <div className="flex flex-col rounded-xl border border-border overflow-hidden cursor-pointer bg-bg text-text-primary transition-shadow duration-200 hover:shadow-lg">
            <div className="relative">
              <div className="absolute top-2 left-2 flex gap-1">
                <span className="items-center justify-center rounded-md px-2 py-0.5 font-medium w-fit whitespace-nowrap gap-1 transition-[color,box-shadow] overflow-hidden  bg-secondary text-xs">
                  강아지
                </span>
                <span className="items-center justify-center rounded-md border px-2 py-0.5 font-medium w-fit whitespace-nowrap gap-1 transition-[color,box-shadow] overflow-hidden text-xs">
                  거의새것
                </span>
              </div>
              <button className="flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all size-9 rounded-md absolute top-2 right-2 bg-white/80 hover:bg-white w-8 h-8">
                <IoIosHeartEmpty />
              </button>
              <div>
                <img src={bowl} alt="사료 그릇" className="w-full h-auto" />
              </div>
            </div>

            <div className="p-md">
              <h3 className="mb-xs heading5 text-text-primary line-clamp-2">
                로얄캐닌 강아지 사료 15kg (유통기한 6개월 남음)
              </h3>
              <p className="mb-sm heading5 text-primary font-bold">45,000원</p>

              <div className="flex items-center justify-between caption text-text-secondary">
                <div className="flex items-center gap-xs">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-3 h-3"
                    aria-hidden="true"
                  >
                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>서울 강남구</span>
                </div>

                <div className="flex items-center gap-xs">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-3 h-3"
                    aria-hidden="true"
                  >
                    <path d="M12 6v6l4 2"></path>
                    <circle cx="12" cy="12" r="10"></circle>
                  </svg>
                  <span>2시간 전</span>
                </div>
              </div>
            </div>
          </div>
          {/* // 카드 */}
        </div>
      </div>
    </div>
  );
};

export default Home;
