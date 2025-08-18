import logoImage from '@images/CuddleMarketLogo.png';
import { useEffect, useRef, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { HiOutlineBellAlert } from 'react-icons/hi2';
import { RxAvatar } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import UserDropdown from './UserDropDown';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  {
    /* 드롭다운 메뉴 밖에서 마우스 클릭시 드롭다운 비활성화 */
  }
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-1 bg-primary">
      <div className="max-w-[var(--container-max-width)] mx-auto px-lg py-md">
        <div className="flex items-center justify-between gap-lg">
          {/* 로고를 link태그로 감싸 홈버튼으로 설정*/}
          <Link to="/" className="flex items-center">
            <img
              src={logoImage}
              alt="커들마켓"
              className="w-auto h-13 tablet:h-22 object-contain"
            />
          </Link>

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
                  "
                />
              </div>

              <button
                type="button"
                className="
                  h-full px-sm py-sm
                  border border-border rounded-md
                  bg-bg/20 hover:bg-bg/30
                  text-text-primary
                "
              >
                <IoIosSearch className="text-xl tablet:text-2xl" />
              </button>
            </div>
          </div>
          <div className="flex gap-md tablet:gap-xl">
            {/* 알람 드롭다운 호출 */}
            <div className="flex items-center">
              <button type="button" onClick={() => setIsDropdownOpen(prev => !prev)}>
                <HiOutlineBellAlert className="text-3xl tablet:text-4xl" />
              </button>

              {isDropdownOpen && (
                <UserDropdown isOpen={isDropdownOpen} setIsOpen={setIsDropdownOpen} />
              )}
            </div>

            {/* 유저 드롭다운 호출 */}
            <div className="flex items-center" ref={dropdownRef}>
              <button type="button" onClick={() => setIsDropdownOpen(prev => !prev)}>
                <RxAvatar className="text-3xl tablet:text-4xl" />
              </button>

              {isDropdownOpen && (
                <UserDropdown isOpen={isDropdownOpen} setIsOpen={setIsDropdownOpen} />
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
