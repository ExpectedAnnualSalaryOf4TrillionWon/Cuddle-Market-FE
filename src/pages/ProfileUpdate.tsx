import { LOCATIONS, type StateCode } from '@constants/constants';
import UserDefaultImage from '@images/userDefault.svg';
import { SimpleHeader } from '@layout/SimpleHeader';
import { useUserStore } from '@store/userStore';
import { useRef, useState } from 'react';
import { MdPhotoCamera } from 'react-icons/md';

interface ProfileUpdateProps {
  profile_image_url?: string;
}

const ProfileUpdate: React.FC<ProfileUpdateProps> = ({ profile_image_url }) => {
  const user = useUserStore(state => state.user);
  console.log(user);

  //TODO 전역상태로 현재 유저가 전에 설정한 정보 불러와서 디폴트로 연결하기.
  //디폴트값 대체. 연동되면 지우기.
  const currentNickname = user?.nickname || '';
  const currentSelectedState = user?.state_name || '';
  const currentSelectedCity = user?.city_name || '';

  const [selectedState, setSelectedState] = useState<StateCode | string>('');
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  const provinceBoxRef = useRef<HTMLDivElement | null>(null);
  const cityBoxRef = useRef<HTMLDivElement | null>(null);

  const [editField, setEditField] = useState<string | null>(null);

  const cityOptions = selectedState
    ? LOCATIONS.find(location => location.code === selectedState)?.cities || []
    : [];

  const [formData, setFormData] = useState({
    nickname: currentNickname,
    selectedProvince: currentSelectedState,
    selectedCity: currentSelectedCity,
    profile_image_url,
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
  };

  const handleSelectCity = (cityCode: string) => {
    setSelectedCity(cityCode);
    setShowCityDropdown(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    //input창의 name 속성과 value 속성을 필요로 한다.
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // TODO: 저장 API 호출 후 handlechange 삭제.
    setEditField(null); // 변동사항 적용 후 편집 종료
  };

  const handleCancel = () => {
    setEditField(null); // 변동사항 없이 종료
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 브라우저 기본 새로고침 막기
    // 여기서 API 호출 + 상태 업데이트
    console.log('프로필 저장:', formData);
    // 예: useUserStore.getState().updateUserProfile(formData);
  };

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
              className="flex w-full rounded-md px-3 py-1 text-sm "
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
                      className="aspect-square size-full"
                      alt="멍멍이아빠"
                      src={UserDefaultImage}
                    />
                  </div>
                  <label
                    htmlFor="profile-image"
                    className="absolute bottom-0 -right-2 bg-primary text-white rounded-full p-2 cursor-pointer"
                  >
                    <MdPhotoCamera />
                  </label>
                  <input id="profile-image" type="file" accept="image/*" className="hidden" />
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
                              : currentSelectedState || '시/도를 선택해주세요'}
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
                              : selectedState
                              ? '구/군을 선택해주세요'
                              : currentSelectedCity || '구/군을 선택해주세요'}
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
                onClick={() => {
                  alert('API 연동 시 userStore 상태변경 후 리렌더링');
                }}
              >
                프로필 저장
              </button>
            </div>
          </form>

          <form className="flex flex-col gap-6 rounded-xl border border-border px-6 py-6">
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
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfileUpdate;
