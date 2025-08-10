import SearchIcon from '@icons/SearchIcon';
import { useState } from 'react';
import logoImage from '../../../public/assets/images/CuddleMarketLogo.png';

export function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header
      className="border-b border-gray-200 sticky top-0 z-50"
      style={{ background: '#a7c5eb' }}
    >
      <div className="max-w-[1280px] mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* 로고 */}
          <div className="flex items-center flex-shrink-0">
            <img src={logoImage} alt="Cuddle Market" className="h-12 w-auto object-contain" />
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
                  // onKeyPress={handleKeyPress}
                  className="w-full px-4 py-2 border border-white/30 rounded-lg bg-white/90 backdrop-blur-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                />
              </div>
              <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-8 rounded-md gap-1.5 has-[>svg]:px-2.5 bg-white/20 hover:bg-white/30 text-white border border-white/30 px-4 py-2">
                <SearchIcon />
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-3 flex-shrink-0">
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 h-9 px-4 py-2 has-[>svg]:px-3">
              로그인
            </button>
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 has-[>svg]:px-3">
              회원가입
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;
