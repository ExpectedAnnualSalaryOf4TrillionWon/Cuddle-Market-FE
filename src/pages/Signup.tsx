import logoImage from '@images/CuddleMarketLogoImage.png';
import { useState } from 'react';
import { CiCalendar, CiLocationOn, CiUser } from 'react-icons/ci';
import { PiTagThin } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
//max-w-[375px]  : 해당 값보다 요소가 더 커지지 않게
const CITIES = {
  서울특별시: [
    '강남구',
    '강동구',
    '강북구',
    '강서구',
    '관악구',
    '광진구',
    '구로구',
    '금천구',
    '노원구',
    '도봉구',
    '동대문구',
    '동작구',
    '마포구',
    '서대문구',
    '서초구',
    '성동구',
    '성북구',
    '송파구',
    '양천구',
    '영등포구',
    '용산구',
    '은평구',
    '종로구',
    '중구',
    '중랑구',
  ],
  부산광역시: [
    '강서구',
    '금정구',
    '기장군',
    '남구',
    '동구',
    '동래구',
    '부산진구',
    '북구',
    '사상구',
    '사하구',
    '서구',
    '수영구',
    '연제구',
    '영도구',
    '중구',
    '해운대구',
  ],
  대구광역시: ['남구', '달서구', '달성군', '동구', '북구', '서구', '수성구', '중구'],
  인천광역시: [
    '강화군',
    '계양구',
    '남동구',
    '동구',
    '미추홀구',
    '부평구',
    '서구',
    '연수구',
    '옹진군',
    '중구',
  ],
  광주광역시: ['광산구', '남구', '동구', '북구', '서구'],
  대전광역시: ['대덕구', '동구', '서구', '유성구', '중구'],
  울산광역시: ['남구', '동구', '북구', '울주군', '중구'],
  세종특별자치시: ['세종시'],
} as const;
type Province = keyof typeof CITIES;
const PROVINCES = Object.keys(CITIES) as Province[];

const Signup = () => {
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
  const [showProvinceSelect, setShowProvinceSelect] = useState(false);

  const [selectedCity, setSelectedCity] = useState<string>('');
  const [showCitySelect, setShowCitySelect] = useState(false);

  const cityOptions = selectedProvince ? CITIES[selectedProvince] : [];
  const navigate = useNavigate();
  const handleToLogin = () => {
    navigate('/signin');
  };
  const handleSelectProvince = (opt: Province) => {
    setSelectedProvince(opt);
    setSelectedCity(''); // 시/도 변경 시 구/군 초기화
    setShowProvinceSelect(false); // 시/도 목록 닫기
    setShowCitySelect(false);
  };

  const handleSelectCity = (opt: string) => {
    setSelectedCity(opt);
    setShowCitySelect(false);
  };
  return (
    <div className="px-lg py-8 bg-primary h-[100vh] flex items-center justify-center">
      <div>
        {/* 헤더 영역 */}
        <div className="text-center flex flex-col items-center gap-6 pb-2xl">
          <div className="flex h-20 w-20 items-center justify-center rounded-full">
            <img src={logoImage} alt="" className="object-cover h-full" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <h2 className="heading3 text-text-primary">커들마켓에 오신 것을 환영합니다!</h2>
            <p className="bodyLarge text-text-secondary">
              안전한 반려동물 용품 거래를 시작해보세요
            </p>
          </div>
        </div>
        <div className="flex justify-center w-full">
          {/* 카드 */}
          <div className="flex flex-col gap-6 rounded-xl bg-light/90 shadow-2xl py-[2rem] px-[1.5rem] w-[700px]">
            {/* 카드 헤더: grid → flex + gap */}
            <div className="flex flex-col items-center gap-1.5">
              <h4 className="heading4 text-center text-text-primary">회원가입</h4>
              <p className="bodyLarge text-center text-text-secondary">
                커들마켓에 가입하여 더 많은 기능을 이용해보세요
              </p>
            </div>

            {/* 카드 콘텐츠: 내부 섹션 간격을 gap으로 관리 */}
            <div className="flex flex-col gap-8 pb-8 ">
              {/* 폼 */}
              <form className="flex flex-col gap-5">
                {/* 이름 */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="signup-name" className="bodySmall font-medium text-text-primary">
                    이름 *
                  </label>
                  <div className="relative">
                    <CiUser className="absolute left-4 top-1/2 translate-y-[-50%]" size={18} />
                    <input
                      id="signup-name"
                      placeholder="실제 이름을 입력해주세요"
                      required
                      maxLength={15}
                      className="flex h-12 w-full rounded-xl border border-border bg-light px-3 py-1 pl-12 transition-[color,box-shadow]"
                    />
                  </div>
                  <p className="text-sm font-medium text-[#000]">
                    이름은 2글자 이상 15자 이하입니다.
                  </p>
                  <p id="signup-name-error" className="text-sm font-medium text-[#f87171]">
                    이름을 입력해주세요.
                  </p>
                </div>

                {/* 닉네임 */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="signup-nickname"
                    className="bodySmall font-medium text-text-primary"
                  >
                    닉네임 *
                  </label>
                  <div className="relative">
                    <PiTagThin className="absolute left-4 top-1/2 translate-y-[-50%]" size={18} />
                    <input
                      id="signup-nickname"
                      placeholder="사용할 닉네임을 입력해주세요"
                      required
                      maxLength={12}
                      className="flex h-12 w-full min-w-0 rounded-xl border border-border bg-light px-3 py-1 pl-12 transition-[color,box-shadow]"
                    />
                  </div>
                  <p className="text-sm font-medium text-[#000]">
                    닉네임은 2글자 이상 12자 이하입니다.
                  </p>
                  <p id="signup-name-error" className="text-sm font-medium text-[#f87171]">
                    닉네임을 입력해주세요.
                  </p>
                </div>

                {/* 생년월일 */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="signup-birth-date"
                    className="bodySmall font-medium text-text-primary"
                  >
                    생년월일 *
                  </label>
                  <div className="relative">
                    <CiCalendar className="absolute left-4 top-1/2 translate-y-[-50%]" size={18} />
                    <input
                      id="signup-birth-date"
                      type="date"
                      required
                      className="flex h-12 w-full rounded-xl border border-border bg-light px-3 py-1 pl-12 transition-[color,box-shadow]"
                    />
                  </div>
                  <p id="signup-birth-date-error" className="text-sm font-medium text-[#f87171]">
                    생년월일을 선택해주세요.
                  </p>
                </div>

                {/* 거주지 */}
                <div className="flex flex-col gap-4">
                  <label className="bodySmall font-medium text-text-primary">거주지 *</label>

                  <div className="flex flex-col gap-3">
                    <div className="relative">
                      <CiLocationOn
                        className="absolute left-4 top-1/2 translate-y-[-50%]"
                        size={18}
                      />
                      <button
                        type="button"
                        role="combobox"
                        onClick={() => {
                          setShowProvinceSelect(prev => !prev);
                          setShowCitySelect(false);
                        }}
                        className={`flex w-full rounded-md py-2 pl-10 text-sm bg-light border border-border`}
                      >
                        <span className="text-gray-500">
                          {selectedProvince || '시/도를 선택해주세요'}
                        </span>
                      </button>
                      {showProvinceSelect && (
                        <div
                          role="listbox"
                          aria-label="시/도 선택"
                          className="absolute left-0 top-full z-40  w-full rounded-md border border-border bg-white p-1 shadow-md mt-sm"
                        >
                          {PROVINCES.map(opt => (
                            <button
                              key={opt}
                              role="option"
                              aria-selected={selectedProvince === opt}
                              type="button"
                              onClick={() => handleSelectProvince(opt)}
                              className={`w-full p-1 rounded-md transition
                              hover:bg-gray-100 focus:bg-gray-100 focus:outline-none text-left bodySmall
                              ${
                                selectedProvince === opt ? 'bg-gray-100 ring-1 ring-gray-300' : ''
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="relative">
                      <CiLocationOn
                        className="absolute left-4 top-1/2 translate-y-[-50%]"
                        size={18}
                      />
                      <button
                        type="button"
                        role="combobox"
                        onClick={() => {
                          if (!selectedProvince) return;
                          setShowCitySelect(prev => !prev);
                          setShowProvinceSelect(false);
                        }}
                        className={`flex w-full rounded-md py-2 pl-10 text-sm bg-light border border-border`}
                      >
                        <span className="text-gray-500">
                          {selectedCity ||
                            (selectedProvince
                              ? '구/군을 선택해주세요'
                              : '먼저 시/도를 선택해주세요')}
                        </span>
                      </button>
                      {showCitySelect && selectedProvince && (
                        <div
                          role="listbox"
                          aria-label="구/군 선택"
                          className="absolute left-0 top-full z-40  w-full rounded-md border border-border bg-white p-1 shadow-md
                          mt-sm"
                        >
                          {cityOptions.map(opt => (
                            <button
                              key={opt}
                              role="option"
                              aria-selected={selectedCity === opt}
                              type="button"
                              onClick={() => handleSelectCity(opt)}
                              className={`w-full p-1 py-xs rounded-md transition
                              hover:bg-gray-100 focus:bg-gray-100 focus:outline-none text-left bodySmall
                              ${selectedCity === opt ? 'bg-gray-100 ring-1 ring-gray-300' : ''}`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <p id="signup-district-error" className="text-sm font-medium text-[#f87171]">
                      시/도 와 군/구를 선택해주세요.
                    </p>
                  </div>
                </div>

                {/* 제출 */}
                {/* <button
                  type="submit"
                  disabled
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#fee500] px-4 py-2 text-base font-semibold text-[#000]/85 shadow-lg cursor-pointer"
                >
                  <div className="h-1/2">
                    <img src={kakao} alt="" className="h-full object-cover" />
                  </div>
                  <span>카카오톡으로 시작하기</span>
                </button> */}
                <button
                  type="submit"
                  disabled
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2 text-base font-semibold shadow-lg cursor-pointer"
                >
                  <span>회원가입 하기</span>
                </button>
              </form>
            </div>
          </div>
          {/* card 끝 */}
        </div>
      </div>
    </div>
  );
};

export default Signup;
