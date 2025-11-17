import { LOCATIONS, type StateCode } from '@constants/constants';
import UserDefaultImage from '@images/userDefault.svg';
import { SimpleHeader } from '@src/components/layouts/SimpleHeader';
import { useUserStore } from '@store/userStore';
import { useRef, useState } from 'react';
import { MdPhotoCamera } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../api/apiFetch';

interface ProfileUpdateProps {
  profile_image_url?: string;
}

function ProfileUpdate() {
  const { user, redirectUrl, setRedirectUrl, setUser, updateUserProfile } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL;
  //TODO 전역상태로 현재 유저가 전에 설정한 정보 불러와서 디폴트로 연결하기.
  //디폴트값 대체. 연동되면 지우기.
  const currentNickname = user?.nickname || '';
  const currentSelectedState = user?.state_name || '';
  const currentSelectedCity = user?.city_name || '';

  const [selectedState, setSelectedState] = useState<StateCode | string>('');
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const provinceBoxRef = useRef<HTMLDivElement | null>(null);
  const cityBoxRef = useRef<HTMLDivElement | null>(null);

  const [editField, setEditField] = useState<string | null>(null);

  const cityOptions = selectedState
    ? LOCATIONS.find(location => location.code === selectedState)?.cities || []
    : [];

  const [formData, setFormData] = useState({
    nickname: currentNickname,
    state: currentSelectedState,
    city: currentSelectedCity,
    profile_image_url: '',
  });

  const getStateNameByCode = (code?: string) =>
    LOCATIONS.find(location => location.code === code)?.name ?? code ?? '';

  const getCityNameByCode = (stateCode?: string, cityCode?: string) =>
    LOCATIONS.find(location => location.code === stateCode)?.cities.find(
      city => city.code === cityCode,
    )?.name ??
    cityCode ??
    '';

  const handleStateSelect = (stateCode: string) => {
    setSelectedState(stateCode);
    setSelectedCity('');
    setShowStateDropdown(false);
    const stateName = getStateNameByCode(stateCode);
    setFormData(prev => ({
      ...prev,
      state: stateName, // 코드 대신 이름 저장
      city: '',
    }));
  };

  const handleSelectCity = (cityCode: string) => {
    setSelectedCity(cityCode);
    setShowCityDropdown(false);
    const cityName = getCityNameByCode(selectedState, cityCode);
    setFormData(prev => ({
      ...prev,
      city: cityName, // 코드 대신 이름 저장
    }));
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // 파일 크기 체크 (예: 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('이미지 크기는 5MB 이하여야 합니다.');
        return;
      }

      // 파일 타입 체크
      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드 가능합니다.');
        return;
      }

      setSelectedImage(file);

      // 미리보기 생성
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    //input창의 name 속성과 value 속성을 필요로 한다.
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setEditField(null); // 변동사항 적용 후 편집 종료
  };

  const handleCancel = () => {
    setEditField(null); // 변동사항 없이 종료
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('nickname', formData.nickname);
    formDataToSend.append('state', getStateNameByCode(formData.state));
    formDataToSend.append('city', getCityNameByCode(formData.state, formData.city));

    if (selectedImage) {
      formDataToSend.append('profile_image_file', selectedImage);
    }

    console.log('전송할 데이터:', {
      nickname: formData.nickname,
      state: getStateNameByCode(formData.state), // "경기도"
      city: getCityNameByCode(formData.state, formData.city), // "고양시"
      profile_image_file: !!selectedImage,
    });

    try {
      setIsLoading(true);
      const data = await apiFetch(`${API_BASE_URL}/users/mypage/`, {
        method: 'PATCH',
        body: formDataToSend,
      });

      // const data = await response.json();
      console.log('응답 데이터:', data);
      if (data.user) {
        setUser(data.user);
      } else {
        updateUserProfile({
          nickname: formData.nickname,
          state_name: formData.state,
          city_name: formData.city,
          profile_image: data.profile_image || imagePreview,
        });
      }
      if (redirectUrl) {
        const targetUrl = redirectUrl;
        setRedirectUrl(null);
        console.log('저장된 페이지로 이동:', targetUrl);
        navigate(targetUrl, { replace: true });
      } else {
        console.log('홈으로 이동');
        navigate('/mypage', { replace: true });
      }
    } catch (error) {
      console.error('회원정보 수정 실패:', error);

      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) return <p>로딩중입니다</p>;
  const renderField = (label: string, fieldName: keyof typeof formData) => {
    const value = formData[fieldName] || '';

    return (
      <div className="flex flex-col gap-1">
        <label className="flex items-center gap-2 text-sm" htmlFor="nickname">
          {label}
        </label>
        {editField === fieldName ? (
          <div className="grid grid-cols-[1fr_auto_auto] gap-xs border border-border pr-2 py-2 rounded-md bg-secondary/30">
            <input
              type="text"
              name={fieldName}
              value={value}
              onChange={handleChange}
              maxLength={12}
              className="flex w-full rounded-md px-3 py-1 text-sm line-clamp-2"
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleSave}
                className="text-xs bg-primary rounded-md py-xs px-sm hover:bg-dark"
              >
                저장
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="text-xs bg-primary rounded-md py-xs px-sm hover:bg-dark"
              >
                취소
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-[1fr_auto_auto] gap-xs border border-border pr-2 py-2 rounded-md bg-secondary/30">
            <p className="flex w-full rounded-md text-sm px-3 py-1">{value || '-'}</p>
            <button
              type="button"
              onClick={() => setEditField(fieldName)}
              className="text-xs bg-primary rounded-md py-xs px-sm hover:bg-dark"
            >
              수정
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <SimpleHeader title="내 정보 수정" />
      <div className="max-w-[var(--container-max-width)] mx-auto px-lg py-md tablet:pb-xl tablet:pt-[10vh]">
        <div className="flex flex-col gap-[20px]">
          <form
            className="flex flex-col gap-6 rounded-xl border border-border px-6 py-6"
            onSubmit={handleProfileSubmit}
          >
            <div className="flex flex-col items-start gap-1">
              <h4 className="flex items-center gap-2">기본 정보</h4>
              <p className="text-sm">프로필 이미지, 닉네임, 거주지를 수정할 수 있습니다</p>
            </div>
            <div className="flex flex-col gap-4xl">
              <div className="flex items-start gap-2xl">
                {/* 프로필 사진 */}
                <div className="relative">
                  <div className="relative flex overflow-hidden rounded-full h-24 w-24">
                    <img
                      className="aspect-square size-full object-cover"
                      alt="멍멍이아빠"
                      src={imagePreview || user?.profile_image || UserDefaultImage}
                    />
                  </div>
                  <label
                    htmlFor="profile-image"
                    className="absolute bottom-0 -right-2 bg-primary text-white rounded-full p-2 cursor-pointer"
                  >
                    <MdPhotoCamera />
                  </label>
                  <input
                    id="profile-image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>

                {/* 프로필 정보 */}
                <div className="flex-1 flex flex-col gap-2.5">
                  {/* 닉네임 */}
                  {renderField('닉네임', 'nickname')}

                  {/* 거주지 */}
                  <div className="flex flex-col gap-1">
                    <label className="flex items-center gap-2 text-sm">거주지</label>
                    <div className="flex gap-2">
                      <div
                        className="relative border border-border rounded-md w-1/2"
                        ref={provinceBoxRef}
                      >
                        <button
                          type="button"
                          role="combobox"
                          aria-expanded={showStateDropdown}
                          onClick={() => {
                            setShowStateDropdown(prev => !prev);
                            setShowCityDropdown(false);
                          }}
                          className="flex w-full rounded-md py-2 pl-3 text-sm bg-secondary/30"
                        >
                          <span className="text-gray-500">
                            {selectedState
                              ? getStateNameByCode(selectedState as string)
                              : formData.state // currentSelectedState 대신 formData.state 사용
                              ? getStateNameByCode(formData.state)
                              : '시/도를 선택해주세요'}
                          </span>
                        </button>
                        {showStateDropdown && (
                          <div
                            role="listbox"
                            aria-label="시/도 선택"
                            className="absolute left-0 top-full z-1 w-full rounded-md border border-border bg-white p-1 shadow-md mt-sm"
                          >
                            {LOCATIONS.map(location => (
                              <button
                                key={location.code}
                                role="option"
                                type="button"
                                aria-selected={selectedState === location.code}
                                onClick={() => handleStateSelect(location.code)}
                                className={`w-full px-3 py-xs rounded-md transition
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
                      <div
                        className="relative border border-border rounded-md w-1/2"
                        ref={cityBoxRef}
                      >
                        <button
                          type="button"
                          role="combobox"
                          aria-expanded={showCityDropdown}
                          onClick={() => {
                            if (!selectedState) return;
                            setShowCityDropdown(prev => !prev);
                            setShowStateDropdown(false);
                          }}
                          className="flex w-full rounded-md py-2 pl-3 text-sm bg-secondary/30"
                        >
                          <span className="text-gray-500">
                            {selectedCity
                              ? getCityNameByCode(selectedState as string, selectedCity)
                              : formData.city // currentSelectedCity 대신 formData.city 사용
                              ? getCityNameByCode(formData.state, formData.city)
                              : selectedState || formData.state
                              ? '구/군을 선택해주세요'
                              : '시/도를 먼저 선택해주세요'}
                          </span>
                        </button>
                        {showCityDropdown && selectedState && (
                          <div
                            role="listbox"
                            aria-label="구/군 선택"
                            className="absolute left-0 top-full z-1 w-full rounded-md border border-border bg-white p-1 shadow-md
                                              mt-sm"
                          >
                            {cityOptions.map(city => (
                              <button
                                key={city.code}
                                role="option"
                                aria-selected={selectedCity === city.code}
                                type="button"
                                onClick={() => handleSelectCity(city.code)}
                                className={`w-full px-3 py-xs rounded-md transition
                            hover:bg-gray-100 focus:bg-gray-100 focus:outline-none text-left bodySmall
                            ${
                              selectedCity === city.code ? 'bg-gray-100 ring-1 ring-gray-300' : ''
                            }`}
                              >
                                {city.name}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-md text-sm px-4 py-2 w-full border border-border bg-secondary hover:bg-primary"
              >
                프로필 저장
              </button>
            </div>
          </form>

          {/* <form className="flex flex-col gap-6 rounded-xl border border-border px-6 py-6">
            <div className="flex flex-col items-start gap-1">
              <h4 className="flex items-center gap-2">비밀번호 변경</h4>
              <p className="text-sm">보안을 위해 주기적으로 비밀번호를 변경해주세요</p>
            </div>
            <div className="flex-1 flex flex-col gap-4xl">
              <div className="flex flex-col gap-1">
                <label className="flex items-center gap-2 text-sm" htmlFor="new-password">
                  이메일
                </label>
                <input
                  type="password"
                  className="flex h-9 w-full rounded-md border border-border px-3 py-1 text-sm bg-secondary/30"
                  id="new-password"
                  placeholder="이메일 주소를 입력하세요"
                  value=""
                />
              </div>
              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-md text-sm border border-border px-4 py-2 w-full bg-secondary hover:bg-primary"
                onClick={() => {
                  alert('비밀번호 변경은 자체 로그인 기능 생성시 변경 링크 이메일 발송');
                }}
              >
                비밀번호 변경
              </button>
            </div>
          </form> */}
        </div>
      </div>
    </>
  );
}

export default ProfileUpdate;
