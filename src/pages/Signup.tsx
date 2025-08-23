import { LOCATIONS, type CityCode, type StateCode } from '@constants/constants';
import logoImage from '@images/CuddleMarketLogoImage.png';
import { useUserStore } from '@store/userStore';
import { useEffect, useRef, useState } from 'react';
import { CiCalendar, CiLocationOn, CiUser } from 'react-icons/ci';
import { PiTagThin } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import type { CreateUserRequest, CreateUserResponse, FormErrors } from 'src/types';
//max-w-[375px]  : 해당 값보다 요소가 더 커지지 않게
// const CITIES = {
//   서울특별시: [
//     '강남구',
//     '강동구',
//     '강북구',
//     '강서구',
//     '관악구',
//     '광진구',
//     '구로구',
//     '금천구',
//     '노원구',
//     '도봉구',
//     '동대문구',
//     '동작구',
//     '마포구',
//     '서대문구',
//     '서초구',
//     '성동구',
//     '성북구',
//     '송파구',
//     '양천구',
//     '영등포구',
//     '용산구',
//     '은평구',
//     '종로구',
//     '중구',
//     '중랑구',
//   ],
//   부산광역시: [
//     '강서구',
//     '금정구',
//     '기장군',
//     '남구',
//     '동구',
//     '동래구',
//     '부산진구',
//     '북구',
//     '사상구',
//     '사하구',
//     '서구',
//     '수영구',
//     '연제구',
//     '영도구',
//     '중구',
//     '해운대구',
//   ],
//   대구광역시: ['남구', '달서구', '달성군', '동구', '북구', '서구', '수성구', '중구'],
//   인천광역시: [
//     '강화군',
//     '계양구',
//     '남동구',
//     '동구',
//     '미추홀구',
//     '부평구',
//     '서구',
//     '연수구',
//     '옹진군',
//     '중구',
//   ],
//   광주광역시: ['광산구', '남구', '동구', '북구', '서구'],
//   대전광역시: ['대덕구', '동구', '서구', '유성구', '중구'],
//   울산광역시: ['남구', '동구', '북구', '울주군', '중구'],
//   세종특별자치시: ['세종시'],
// } as const;
// type Province = keyof typeof CITIES;
// const PROVINCES = Object.keys(CITIES) as Province[];

const Signup = () => {
  const [userName, setUserName] = useState<string>('');
  const [userNickName, setUserNickName] = useState<string>('');
  const [userBirth, setUserBirth] = useState<string>('');

  /**거주지 */
  const [selectedState, setSelectedState] = useState<StateCode | string>('');
  const [selectedCity, setSelectedCity] = useState<CityCode | string>('');
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  const cityOptions = selectedState
    ? LOCATIONS.find(location => location.code === selectedState)?.cities || []
    : [];

  /** 거주지 선택창 */
  const stateBoxRef = useRef<HTMLDivElement | null>(null);
  const cityBoxRef = useRef<HTMLDivElement | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const navigate = useNavigate();
  const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL;

  const { accessToken, updateUserProfile, redirectUrl, setRedirectUrl } = useUserStore();

  // 이름
  const handleUserName = (val: string) => {
    setUserName(val === '' ? '' : val);
    if (userName && val) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.userName;
        return newErrors;
      });
    }
  };

  const handleUserNickName = (val: string) => {
    setUserNickName(val === '' ? '' : val);
    if (userNickName && val) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.userNickName;
        return newErrors;
      });
    }
  };

  const handleUserBirth = (val: string) => {
    setUserBirth(val === '' ? '' : val);
    if (userNickName && val) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.userBirth;
        return newErrors;
      });
    }
  };

  const handleStateSelect = (stateCode: string) => {
    setSelectedState(stateCode);
    setSelectedCity('');
    setShowStateDropdown(false);
  };

  const handleCitySelect = (cityCode: string) => {
    setSelectedCity(cityCode);
    setShowCityDropdown(false);
    if (selectedState && cityCode) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.location;
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('상품등록 버튼 클릭');

    if (isSubmitting) return; // 중복 제출 방지

    const newErrors: FormErrors = {};
    // 유효성 검사

    if (!userName) {
      newErrors.userName = '이름을 입력해주세요.';
    }

    if (!userNickName) {
      newErrors.userNickName = '닉네임을 입력해주세요.';
    }

    if (!userBirth) {
      newErrors.userBirth = '생년월일을 선택해주세요.';
    }

    if (!selectedState || !selectedCity) {
      newErrors.location = '거래 희망 지역을 선택해주세요.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // 첫 번째 에러가 있는 위치로 스크롤
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    try {
      const requestBody: CreateUserRequest = {
        nickname: userNickName,
        name: userName,
        birthday: userBirth,
        state: selectedState!,
        city: selectedCity,
      };

      if (!accessToken) {
        alert('로그인이 필요합니다.');
        navigate('/login');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/users/profile-complete/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('회원가입 실패');
      }

      const data: CreateUserResponse = await response.json();
      console.log('📍 응답 데이터:', data);

      updateUserProfile({
        nickname: data.nickname,
        name: data.name,
        birthday: data.birthday,
        state_name: data.state_name,
        city_name: data.city_name,
        profile_completed: true,
      });

      if (redirectUrl) {
        const targetUrl = redirectUrl;
        setRedirectUrl(null); // 사용 후 초기화
        console.log('저장된 페이지로 이동:', targetUrl);
        navigate(targetUrl, { replace: true });
      } else {
        console.log('홈으로 이동');
        navigate('/', { replace: true });
      }
    } catch (error) {
      console.error('회원가입 실패:', error);
      setErrors({
        general: error instanceof Error ? error.message : '회원가입에 실패했습니다.',
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsSubmitting(false);
    }
  };
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      const target = e.target as Node;

      // 시/도 드롭다운 바깥 클릭
      if (showStateDropdown && stateBoxRef.current && !stateBoxRef.current.contains(target)) {
        setShowStateDropdown(false);
      }
      // 구/군 드롭다운 바깥 클릭
      if (showCityDropdown && cityBoxRef.current && !cityBoxRef.current.contains(target)) {
        setShowCityDropdown(false);
      }
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showStateDropdown) setShowStateDropdown(false);
        if (showCityDropdown) setShowCityDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [showStateDropdown, showCityDropdown]);

  return (
    <div className="px-lg py-8 bg-primary min-h-[100vh] flex items-center justify-center">
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
          <div className="flex flex-col gap-6 rounded-xl bg-light/90 shadow-2xl py-[2rem] px-[1.5rem] w-[500px]">
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
              <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
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
                      maxLength={15}
                      value={userName}
                      onChange={e => {
                        const val = e.target.value;
                        handleUserName(val);
                      }}
                      className="flex h-12 w-full rounded-xl border border-border bg-light px-3 py-1 pl-12 transition-[color,box-shadow]"
                    />
                  </div>
                  {/* <p className="text-sm font-medium text-[#000]">
                    이름은 2글자 이상 15자 이하입니다.
                  </p>
                  <p id="signup-name-error" className="text-sm font-medium text-[#f87171]">
                    이름을 입력해주세요.
                  </p> */}
                  {errors.userName && <p className="text-xs text-red-600">{errors.userName}</p>}
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
                      maxLength={12}
                      value={userNickName}
                      onChange={e => {
                        const val = e.target.value;
                        handleUserNickName(val);
                      }}
                      className="flex h-12 w-full min-w-0 rounded-xl border border-border bg-light px-3 py-1 pl-12 transition-[color,box-shadow]"
                    />
                  </div>
                  {/* <p className="text-sm font-medium text-[#000]">
                    닉네임은 2글자 이상 12자 이하입니다.
                  </p> */}
                  {/* <p id="signup-name-error" className="text-sm font-medium text-[#f87171]">
                    닉네임을 입력해주세요.
                  </p> */}
                  {errors.userNickName && (
                    <p className="text-xs text-red-600">{errors.userNickName}</p>
                  )}
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
                      value={userBirth}
                      onChange={e => {
                        const val = e.target.value;
                        handleUserBirth(val);
                      }}
                      className="flex h-12 w-full rounded-xl border border-border bg-light px-3 py-1 pl-12 transition-[color,box-shadow]"
                    />
                  </div>
                  {/* <p id="signup-birth-date-error" className="text-sm font-medium text-[#f87171]">
                    생년월일을 선택해주세요.
                  </p> */}
                  {errors.userBirth && <p className="text-xs text-red-600">{errors.userBirth}</p>}
                </div>

                {/* 거주지 */}
                <div className="flex flex-col gap-4">
                  <label className="bodySmall font-medium text-text-primary">거주지 *</label>

                  <div className="flex flex-col gap-3">
                    <div className="relative" ref={stateBoxRef}>
                      <CiLocationOn
                        className="absolute left-4 top-1/2 translate-y-[-50%]"
                        size={18}
                      />
                      <button
                        type="button"
                        role="combobox"
                        aria-expanded={showStateDropdown}
                        onClick={() => {
                          setShowStateDropdown(prev => !prev);
                          setShowCityDropdown(false);
                        }}
                        className={`flex w-full rounded-md py-2 pl-10 text-sm bg-light border border-border`}
                      >
                        <span className="text-gray-500">
                          {selectedState
                            ? LOCATIONS.find(location => location.code === selectedState)?.name
                            : '시/도를 선택해주세요'}
                        </span>
                      </button>
                      {showStateDropdown && (
                        <div
                          role="listbox"
                          aria-label="시/도 선택"
                          className="absolute left-0 top-full z-40  w-full rounded-md border border-border bg-white p-1 shadow-md mt-sm"
                        >
                          {LOCATIONS.map(location => (
                            <button
                              key={location.code}
                              role="option"
                              type="button"
                              aria-selected={selectedState === location.code}
                              onClick={() => handleStateSelect(location.code)}
                              className={`w-full p-1 rounded-md transition
                              hover:bg-gray-100 focus:bg-gray-100 focus:outline-none text-left bodySmall
                          ${
                            selectedState === location.code
                              ? 'bg-gray-100 ring-1 ring-gray-300'
                              : ''
                          }`}
                            >
                              {location.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="relative" ref={cityBoxRef}>
                      <CiLocationOn
                        className="absolute left-4 top-1/2 translate-y-[-50%]"
                        size={18}
                      />
                      <button
                        type="button"
                        role="combobox"
                        aria-expanded={showCityDropdown}
                        onClick={() => {
                          if (!selectedState) return;
                          setShowCityDropdown(prev => !prev);
                          setShowStateDropdown(false);
                        }}
                        className={`flex w-full rounded-md py-2 pl-10 text-sm bg-light border border-border`}
                      >
                        <span className="text-gray-500">
                          {selectedCity
                            ? cityOptions.find(city => city.code === selectedCity)?.name
                            : selectedState
                            ? '구/군을 선택해주세요'
                            : '먼저 시/도를 선택해주세요'}
                        </span>
                      </button>
                      {showCityDropdown && selectedState && (
                        <div
                          role="listbox"
                          aria-label="구/군 선택"
                          className="absolute left-0 top-full z-40  w-full rounded-md border border-border bg-white p-1 shadow-md
                          mt-sm"
                        >
                          {cityOptions.map(city => (
                            <button
                              key={city.code}
                              role="option"
                              aria-selected={selectedCity === city.code}
                              type="button"
                              onClick={() => handleCitySelect(city.code)}
                              className={`w-full p-1 py-xs rounded-md transition
                              hover:bg-gray-100 focus:bg-gray-100 focus:outline-none text-left bodySmall
                                ${
                                  selectedCity === city.code
                                    ? 'bg-gray-100 ring-1 ring-gray-300'
                                    : ''
                                }`}
                            >
                              {city.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    {/* <p id="signup-district-error" className="text-sm font-medium text-[#f87171]">
                      시/도 와 군/구를 선택해주세요.
                    </p> */}
                  </div>
                  {errors.location && <p className="text-xs text-red-600">{errors.location}</p>}
                </div>

                <button
                  type="submit"
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
