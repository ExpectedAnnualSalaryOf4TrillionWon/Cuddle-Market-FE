import logoImage from '../../../public/assets/images/CuddleMarketLogo.png';

const Footer = () => {
  return (
    <footer className="mt-2xl tablet:mt-3xl border-t border-border bg-light">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 items-start max-w-[var(--container-max-width)] mx-auto px-lg py-xl">
        <div className="sm:col-span-2 lg:col-span-1 w-[5rem] ">
          <img src={logoImage} alt="커들마켓" className="w-auto h-full object-contain" />
        </div>

        <div>
          <h4 className="mb-md tablet:mb-lg heading5 text-text-primary">고객센터</h4>
          <ul className="space-y-xs tablet:space-y-sm bodySmall text-text-secondary">
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
          <h4 className="mb-md tablet:mb-lg heading5 text-text-primary">이용안내</h4>
          <ul className="space-y-xs tablet:space-y-sm bodySmall text-text-secondary">
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
          <h4 className="mb-md tablet:mb-lg heading5 text-text-primary">연락처</h4>
          <ul className="space-y-xs tablet:space-y-sm bodySmall text-text-secondary">
            <li>고객센터: 1588-0000</li>
            <li>평일 09:00 - 18:00</li>
            <li>주말/공휴일 휴무</li>
            <li>help@petmarket.co.kr</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
