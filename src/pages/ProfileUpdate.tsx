import { SimpleHeader } from '@layout/SimpleHeader';
import { useState, useRef } from 'react';
import { CITIES, PROVINCES } from '@constants/Cities';
import type { Province } from '@constants/Cities';
import { CiLocationOn } from 'react-icons/ci';
import UserDefaultImage from '@images/userDefault.svg';
import { useNavigate } from 'react-router-dom';

interface ProfileUpdateProps {
  profile_image_url?: string;
}

const ProfileUpdate: React.FC<ProfileUpdateProps> = ({ profile_image_url }) => {
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
  const [showProvinceSelect, setShowProvinceSelect] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [showCitySelect, setShowCitySelect] = useState(false);
  const navigate = useNavigate();

  const goToMyPage = () => {
    navigate('/mypage');
  };

  const cityOptions = selectedProvince ? CITIES[selectedProvince] : [];

  const provinceBoxRef = useRef<HTMLDivElement | null>(null);
  const cityBoxRef = useRef<HTMLDivElement | null>(null);

  //TODO 전역상태로 현재 유저가 전에 설정한 정보 불러와서 디폴트로 연결하기.
  //디폴트값 대체. 연동되면 지우기.
  const currentNickname: string | null = '닉네임';
  const currentSelectedProvince: null = null;
  const currentSelectedcity: null = null;

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
  const [formData, setFormData] = useState({
    nickname: currentNickname,
    selectedProvince: currentSelectedProvince,
    selectedCity: currentSelectedcity,
    profile_image_url,
  });

  const [editField, setEditField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    //input창의 name 속성과 value 속성을 필요로 한다.
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // TODO: 저장 API 호출 후 handlechange 삭제.
    handleChange;
    setEditField(null); // 변동사항 적용 후 편집 종료
  };

  const handleCancel = () => {
    setEditField(null); // 변동사항 없이 종료
  };

  const renderField = (label: string, fieldName: keyof typeof formData) => {
    const value = formData[fieldName] || '';

    return (
      <div className="flex flex-col gap-xs p-sm text-heading5 bg-bg rounded-2xl">
        <label className="text-heading5 font-bold">{label}</label>
        {editField === fieldName ? (
          <div className="grid grid-cols-[1fr_auto_auto] gap-xs">
            <input
              type="text"
              name={fieldName}
              value={value}
              onChange={handleChange}
              className="border p-xs rounded w-full bg-point"
            />
            <button
              type="button"
              onClick={handleSave}
              className="bg-primary text-text-primary p-xs rounded hover:bg-dark text-xs"
            >
              저장
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-primary text-text-primary p-xs rounded hover:bg-dark text-xs"
            >
              취소
            </button>
          </div>
        ) : (
          <div className="flex justify-between items-center gap-sm">
            <span>{value || '-'}</span>
            <button
              type="button"
              onClick={() => setEditField(fieldName)}
              className="text-xs bg-primary rounded-md p-xs hover:bg-dark"
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
      <form className="max-w-[30rem] h-[80vh] mx-auto px-lg py-lg flex justify-center items-center bg-secondary gap-lg">
        <button
          type="button"
          className="p-xs"
          onClick={() => {
            alert('프로필 이미지 업로드창 출력');
          }}
        >
          <img src={UserDefaultImage} alt="유저 프로필 이미지" />
        </button>
        <div className="flex flex-col gap-sm my-auto w-full bg-bg p-md rounded-md ">
          {renderField('닉네임', 'nickname')}
          <div className="relative" ref={provinceBoxRef}>
            <CiLocationOn className="absolute left-3 top-1/2 transform -translate-y-1/2" />
            <button
              type="button"
              role="combobox"
              aria-expanded={showProvinceSelect}
              onClick={() => {
                setShowProvinceSelect(prev => !prev);
                setShowCitySelect(false);
              }}
              className={`flex w-full rounded-md py-2 pl-10 text-sm bg-secondary/30`}
            >
              <span className="text-gray-500">{selectedProvince || '시/도를 선택해주세요'}</span>
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
          <div className="relative" ref={cityBoxRef}>
            <CiLocationOn className="absolute left-3 top-1/2 transform -translate-y-1/2" />
            <button
              type="button"
              role="combobox"
              aria-expanded={showCitySelect}
              onClick={() => {
                if (!selectedProvince) return;
                setShowCitySelect(prev => !prev);
                setShowProvinceSelect(false);
              }}
              className={`flex w-full rounded-md py-2 pl-10 text-sm bg-secondary/30`}
            >
              <span className="text-gray-500">
                {selectedCity ||
                  (selectedProvince ? '구/군을 선택해주세요' : '먼저 시/도를 선택해주세요')}
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
          <button
            type="submit"
            className="bg-primary hover:bg-dark"
            onClick={() => {
              alert('저장 완료 후 마이페이지로 이동');
              goToMyPage();
            }}
          >
            저장하기
          </button>
        </div>
      </form>
    </>
  );
};

export default ProfileUpdate;
