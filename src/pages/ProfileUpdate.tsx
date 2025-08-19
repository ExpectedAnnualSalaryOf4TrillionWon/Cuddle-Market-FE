import { SimpleHeader } from '@layout/SimpleHeader';
import { useState } from 'react';

interface ProfileUpdateProps {
  nickname?: string;
  profile_image?: string;
  state?: string;
  city?: string;
}

const ProfileUpdate: React.FC<ProfileUpdateProps> = ({ nickname, state, city, profile_image }) => {
  const [formData, setFormData] = useState({
    nickname,
    state,
    city,
    profile_image,
  });

  const [editField, setEditField] = useState<string | null>(null); // 현재 수정 중인 항목

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // TODO: 저장 API 호출
    alert(`${editField} 저장 완료`);
    setEditField(null); // 편집 종료
  };

  const handleCancel = () => {
    // 수정 취소 → 원래 데이터로 복구
    setFormData({
      nickname,
      state,
      city,
      profile_image,
    });
    setEditField(null);
  };

  const renderField = (label: string, fieldName: keyof typeof formData) => {
    const value = formData[fieldName] || '';

    return (
      <div className="flex flex-col gap-xs text-heading5">
        <label className="font-semibold">{label}</label>
        {editField === fieldName ? (
          <div className="flex gap-sm items-center">
            <input
              type="text"
              name={fieldName}
              value={value}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
            <button
              onClick={handleSave}
              className="bg-primary text-white px-md py-sm rounded hover:bg-dark"
            >
              저장
            </button>
            <button
              onClick={handleCancel}
              className="border text-gray-700 px-md py-sm rounded hover:bg-gray-100"
            >
              취소
            </button>
          </div>
        ) : (
          <div className="flex justify-between items-center gap-sm">
            <span>{value || '-'}</span>
            <button
              onClick={() => setEditField(fieldName)}
              className="text-sm text-blue-600 hover:underline"
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
      <div className="max-w-[var(--container-max-width)] mx-auto px-lg py-3xl flex justify-center bg-bg">
        <div className="flex flex-col gap-xl m-xs w-full max-w-md">
          {renderField('닉네임', 'nickname')}
          {renderField('시/도', 'state')}
          {renderField('시/군/구', 'city')}
          <div className="flex flex-col gap-xs text-heading5">
            <label className="font-semibold">프로필 이미지</label>
            {editField === 'profile_image' ? (
              <div className="flex gap-sm items-center">
                <input
                  type="text"
                  name="profile_image"
                  value={formData.profile_image || ''}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                />
                <button
                  onClick={handleSave}
                  className="bg-primary text-white px-md py-sm rounded hover:bg-dark"
                >
                  저장
                </button>
                <button
                  onClick={handleCancel}
                  className="border text-gray-700 px-md py-sm rounded hover:bg-gray-100"
                >
                  취소
                </button>
              </div>
            ) : (
              <div className="flex justify-between items-center gap-sm">
                {formData.profile_image ? (
                  <img
                    src={formData.profile_image}
                    alt="프로필"
                    className="w-20 h-20 rounded-full object-cover"
                  />
                ) : (
                  <span>-</span>
                )}
                <button
                  onClick={() => setEditField('profile_image')}
                  className="text-sm text-blue-600 hover:underline"
                >
                  수정
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileUpdate;
