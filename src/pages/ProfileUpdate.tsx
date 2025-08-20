import UserDefaultImage from '@images/userDefault.svg';
// import { CiLocationOn } from 'react-icons/ci';
import { MdPhotoCamera } from 'react-icons/md';

import { CITIES, PROVINCES, type Province } from '@constants/Cities';
import { SimpleHeader } from '@layout/SimpleHeader';
import { useRef, useState } from 'react';

interface ProfileUpdateProps {
  profile_image_url?: string;
}

const ProfileUpdate: React.FC<ProfileUpdateProps> = ({ profile_image_url }) => {
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
  const [showProvinceSelect, setShowProvinceSelect] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [showCitySelect, setShowCitySelect] = useState(false);
  const provinceBoxRef = useRef<HTMLDivElement | null>(null);
  const cityBoxRef = useRef<HTMLDivElement | null>(null);
  const cityOptions = selectedProvince ? CITIES[selectedProvince] : [];

  const [editField, setEditField] = useState<string | null>(null);

  //TODO 전역상태로 현재 유저가 전에 설정한 정보 불러와서 디폴트로 연결하기.
  //디폴트값 대체. 연동되면 지우기.
  const currentNickname: string | null = '닉네임';
  const currentSelectedProvince: null = null;
  const currentSelectedcity: null = null;

  const [formData, setFormData] = useState({
    nickname: currentNickname,
    selectedProvince: currentSelectedProvince,
    selectedCity: currentSelectedcity,
    profile_image_url,
  });

  const handleSelectProvince = (opt: Province) => {
    setSelectedProvince(opt);
    setSelectedCity('');
    setShowProvinceSelect(false);
    setShowCitySelect(false);
  };

  const handleSelectCity = (opt: string) => {
    setSelectedCity(opt);
    setShowCitySelect(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    //input창의 name 속성과 value 속성을 필요로 한다.
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // TODO: 저장 API 호출
    // handleChange;
    setEditField(null); // 변동사항 적용 후 편집 종료
  };

  const handleCancel = () => {
    setEditField(null); // 변동사항 없이 종료
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
      <div className="max-w-[var(--container-max-width)] mx-auto px-lg py-md tablet:py-xl">
        <div className="flex flex-col gap-[20px]">
          <form className="flex flex-col gap-6 rounded-xl border border-border px-6 py-6">
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
                          aria-expanded={showProvinceSelect}
                          onClick={() => {
                            setShowProvinceSelect(prev => !prev);
                            setShowCitySelect(false);
                          }}
                          className="flex w-full rounded-md py-2 pl-3 text-sm bg-secondary/30"
                        >
                          <span className="text-gray-500">
                            {selectedProvince || '시/도를 선택해주세요'}
                          </span>
                        </button>
                        {showProvinceSelect && (
                          <div
                            role="listbox"
                            aria-label="시/도 선택"
                            className="absolute left-0 top-full z-1 w-full rounded-md border border-border bg-white p-1 shadow-md mt-sm"
                          >
                            {PROVINCES.map(opt => (
                              <button
                                key={opt}
                                role="option"
                                aria-selected={selectedProvince === opt}
                                type="button"
                                onClick={() => handleSelectProvince(opt)}
                                className={`w-full px-3 py-xs rounded-md transition
                            hover:bg-gray-100 focus:bg-gray-100 focus:outline-none text-left bodySmall
                            ${selectedProvince === opt ? 'bg-gray-100 ring-1 ring-gray-300' : ''}`}
                              >
                                {opt}
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
                          aria-expanded={showCitySelect}
                          onClick={() => {
                            if (!selectedProvince) return;
                            setShowCitySelect(prev => !prev);
                            setShowProvinceSelect(false);
                          }}
                          className="flex w-full rounded-md py-2 pl-3 text-sm bg-secondary/30"
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
                            className="absolute left-0 top-full z-1 w-full rounded-md border border-border bg-white p-1 shadow-md
                                              mt-sm"
                          >
                            {cityOptions.map(opt => (
                              <button
                                key={opt}
                                role="option"
                                aria-selected={selectedCity === opt}
                                type="button"
                                onClick={() => handleSelectCity(opt)}
                                className={`w-full px-3 py-xs rounded-md transition
                            hover:bg-gray-100 focus:bg-gray-100 focus:outline-none text-left bodySmall
                            ${selectedCity === opt ? 'bg-gray-100 ring-1 ring-gray-300' : ''}`}
                              >
                                {opt}
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
                className="flex items-center justify-center gap-2 rounded-md text-sm px-4 py-2 w-full border border-border bg-secondary"
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
                className="flex items-center justify-center gap-2 rounded-md text-sm border border-border px-4 py-2 w-full bg-secondary"
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
