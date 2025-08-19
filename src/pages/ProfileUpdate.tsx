import { SimpleHeader } from '@layout/SimpleHeader';
import { useState, useRef } from 'react';
import { CITIES, PROVINCES } from '@constants/Cities';
import type { Province } from '@constants/Cities';
import { CiLocationOn } from 'react-icons/ci';

interface ProfileUpdateProps {
  nickname?: string;
  profile_image?: string;
  state?: string;
  city?: string;
}

const ProfileUpdate: React.FC<ProfileUpdateProps> = ({ nickname, state, city, profile_image }) => {
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
  const [showProvinceSelect, setShowProvinceSelect] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [showCitySelect, setShowCitySelect] = useState(false);

  const cityOptions = selectedProvince ? CITIES[selectedProvince] : [];

  const provinceBoxRef = useRef<HTMLDivElement | null>(null);
  const cityBoxRef = useRef<HTMLDivElement | null>(null);

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
    nickname,
    state,
    city,
    profile_image,
  });

  const [editField, setEditField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // TODO: 저장 API 호출
    handleChange;
    setEditField(null); // 편집 종료
  };

  const handleCancel = () => {
    setEditField(null);
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
              onClick={handleSave}
              className="bg-primary text-text-primary p-xs rounded hover:bg-dark text-xs"
            >
              저장
            </button>
            <button
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
      <div className="max-w-[20rem] h-[80vh] mx-auto px-lg py-lg flex justify-center items-center ">
        <div className="flex flex-col gap-sm my-auto w-full bg-secondary p-md rounded-md ">
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
        </div>
      </div>
    </>
  );
};

export default ProfileUpdate;
