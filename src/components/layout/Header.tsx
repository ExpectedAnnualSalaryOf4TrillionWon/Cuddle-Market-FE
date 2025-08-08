import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const MainHeader = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
  };

  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-blue-200 shadow-md h-30">
      {/* 로고 */}
      <div className="cursor-pointer" onClick={() => navigate('/')}>
        <img src="/assets/images/CuddleMarketLogo.png" className="h-25" />
      </div>

      {/* 검색창 */}
      <div className="flex-1 mx-8 flex h-12">
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 rounded-r-md hover:bg-blue-600 transition-colors w-12  flex items-center justify-center"
        >
          검색
        </button>
      </div>

      {/* 프로필 */}
      <div className="relative">
        <img
          src="/assets/images/profile-default.png"
          alt="profile"
          onClick={toggleDropdown}
          className="h-15 w-15 rounded-full cursor-pointer border border-gray-300"
        />
        {dropdownOpen && (
          <ul className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-lg z-10">
            <li
              onClick={() => navigate('/mypage')}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              마이페이지
            </li>
            <li
              onClick={() => alert('로그아웃 기능')}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              로그아웃
            </li>
          </ul>
        )}
      </div>
    </header>
  );
};

export default MainHeader;
