import SearchIcon from '@icons/SearchIcon';
import { useState } from 'react';
import logoImage from '../../../public/assets/images/CuddleMarketLogo.png';

export function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-primary">
      <div className="max-w-[var(--container-max-width)] mx-auto px-lg py-md">
        <div className="flex items-center justify-between gap-lg">
          {/* 로고 */}
          <div className="flex flex-shrink-0 items-center">
            <img src={logoImage} alt="Cuddle Market" className="w-auto h-12 object-contain" />
          </div>

          {/* 검색 영역 */}
          <div className="flex-1 max-w-[42rem] mx-lg">
            <div className="flex items-center gap-sm">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="원하는 반려동물 용품을 검색해보세요"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="
                    w-full
                    px-lg py-sm
                    border border-border rounded-lg
                    bg-bg
                    text-text-primary placeholder:text-text-secondary
                    backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                  "
                />
              </div>

              <button
                className="
                  inline-flex items-center justify-center shrink-0
                  h-8 px-lg py-sm gap-sm
                  border border-border rounded-md
                  bg-secondary hover:bg-light
                  text-text-primary
                  transition-all focus-visible:ring-2 focus-visible:ring-primary
                "
              >
                <SearchIcon />
              </button>
            </div>
          </div>

          {/* 로그인/회원가입 */}
          <div className="flex flex-shrink-0 items-center space-x-md">
            <button
              className="
                inline-flex items-center justify-center
                h-9 px-lg py-sm gap-sm
                rounded-md
                text-text-primary
                hover:bg-light
                transition-all focus-visible:ring-2 focus-visible:ring-primary
              "
            >
              로그인
            </button>

            <button
              className="
                inline-flex items-center justify-center
                h-9 px-lg py-sm gap-sm
                rounded-md
                bg-dark text-bg
                hover:opacity-90
                transition-all focus-visible:ring-2 focus-visible:ring-primary
              "
            >
              회원가입
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;
