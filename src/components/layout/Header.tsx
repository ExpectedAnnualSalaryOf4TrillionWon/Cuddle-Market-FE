// 모바일 경우에 넣는 로고이미지는 다른 이미지입니다.
import logoImage from '@images/CuddleMarketLogo.png';
import { useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { RxAvatar } from 'react-icons/rx';

export function Header() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-1 bg-primary">
      <div className="max-w-[var(--container-max-width)] mx-auto px-lg py-md">
        <div className="flex items-center justify-between gap-lg">
          {/* 로고 */}
          <div className="flex items-center">
            <img src={logoImage} alt="커들마켓" className="w-auto h-22 object-contain" />
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
                    backdrop-blur-sm
                  "
                />
              </div>

              <button
                className="items-center justify-center gap-sm
                  h-full px-sm py-sm
                  border border-border rounded-md
                  bg-bg/20 hover:bg-bg/30
                  text-text-primary
                  transition-all
                "
              >
                <IoIosSearch />
              </button>
            </div>
          </div>

          {/* 로그인/회원가입 */}
          <div className="flex items-center">
            <button
              className="items-center justify-center gap-sm
                h-9 px-lg py-sm
                rounded-md
                text-text-primary
                hover:bg-light
                transition-all"
            >
              로그인
            </button>

            <button
              className="items-center justify-center gap-sm
                h-9 px-lg py-sm
                transition-all
                
              "
            >
              <RxAvatar size={22} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;
