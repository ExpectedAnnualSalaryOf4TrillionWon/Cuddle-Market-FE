import SearchIcon from '@icons/SearchIcon';
import { useState } from 'react';
import logoImage from '../../../public/assets/images/CuddleMarketLogo.png';

export function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-primary">
      <div className="max-w-[1280px] mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* 로고 */}
          <div className="flex items-center flex-shrink-0">
            <img src={logoImage} alt="Cuddle Market" className="w-auto h-12 object-contain" />
          </div>

          {/* 검색 영역 */}
          <div className="flex-1 max-w-[42rem] mx-4">
            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="원하는 반려동물 용품을 검색해보세요"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-bg backdrop-blur-sm text-text-primary placeholder:text-text-secondary"
                />
              </div>

              <button className="items-center justify-center shrink-0 gap-1.5 h-8 px-4 py-2 border border-border rounded-md bg-white/20 hover:bg-white/30 text-text-primary transition-all">
                <SearchIcon />
              </button>
            </div>
          </div>

          {/* 로그인/회원가입 */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <button className="items-center justify-center gap-2 h-9 px-4 py-2 rounded-md text-text-primary hover:bg-light transition-all">
              로그인
            </button>

            <button className="items-center justify-center gap-2 h-9 px-4 py-2 rounded-md text-text-primary hover:bg-primary/90 transition-all">
              회원가입
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;
