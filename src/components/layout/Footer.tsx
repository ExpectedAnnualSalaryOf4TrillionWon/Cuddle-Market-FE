import CuddleMarketLogoImage from '../../../public/assets/images/CuddleMarketLogoImage.png';

const Footer = () => {
  return (
    <footer className="border-t border-border bg-light">
      <div className="max-w-[var(--container-max-width)] mx-auto px-lg py-xl tablet:py-2xl">
        <div className="space-y-xl tablet:space-y-2xl">
          {/* 모바일/태블릿 전용 상단 블록 */}
          <div className="flex flex-col desktop:hidden">
            <h3 className="mb-md tablet:mb-lg font-bold heading5 text-text-primary">커들마켓</h3>
            <p className="mb-md tablet:mb-lg bodySmall text-text-secondary">
              반려동물과 함께하는 행복한 일상을 위한 중고거래 플랫폼
            </p>
            <div className="flex items-center gap-sm">
              <div className="flex items-center justify-center w-12 h-12 p-sm rounded bg-primary">
                <img src={CuddleMarketLogoImage} alt="Cuddle Market 로고" />
              </div>
              <span className="bodySmall text-text-secondary">안전한 거래</span>
            </div>
          </div>

          <div className="grid grid-cols-1 tablet:grid-cols-3 desktop:grid-cols-4 gap-xl tablet:gap-2xl">
            {/* 데스크톱 전용 브랜드 영역 */}
            <div className="hidden desktop:flex desktop:flex-col desktop:gap-lg">
              <div className="flex items-center gap-sm">
                <div className="flex items-center justify-center w-12 h-12 p-sm rounded bg-primary">
                  <img
                    src={CuddleMarketLogoImage}
                    alt="Cuddle Market 로고"
                    className="object-cover"
                  />
                </div>
                <h3 className="font-bold heading5 text-text-secondary">커들마켓</h3>
              </div>
              <p className="mb-md tablet:mb-lg bodySmall text-text-secondary">
                반려동물과 함께하는 행복한 중고거래 플랫폼
              </p>
            </div>

            <div>
              <h4 className="mb-md tablet:mb-lg font-medium heading5 text-text-primary">
                고객센터
              </h4>
              <ul className="space-y-sm tablet:space-y-md bodySmall text-text-secondary">
                <li>
                  <a href="#" className="hover:text-primary">
                    공지사항
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    자주묻는질문
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    1:1 문의
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    신고하기
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-md tablet:mb-lg font-medium heading5 text-text-primary">
                이용안내
              </h4>
              <ul className="space-y-sm tablet:space-y-md bodySmall text-text-secondary">
                <li>
                  <a href="#" className="hover:text-primary">
                    이용약관
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    개인정보처리방침
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    안전거래가이드
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    판매자가이드
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-md tablet:mb-lg font-medium heading5 text-text-primary">연락처</h4>
              <ul className="space-y-sm tablet:space-y-md bodySmall text-text-secondary">
                <li>고객센터: 1588-0000</li>
                <li>평일 09:00 - 18:00</li>
                <li>주말/공휴일 휴무</li>
                <li>help@petmarket.co.kr</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-xl tablet:mt-2xl pt-lg tablet:pt-xl">
          <p className="text-center caption tablet:bodySmall text-text-secondary">
            © 2025 커들마켓. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
