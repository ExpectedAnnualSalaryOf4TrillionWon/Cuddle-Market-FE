import { SimpleHeader } from '@layout/SimpleHeader';
import { useState } from 'react';

interface ProfileUpdateProps {
  nickname?: string;
  profile_image?: string;
  state?: string;
  city?: string;
}
const ProfileUpdate: React.FC<ProfileUpdateProps> = ({
  nickname,

  state,
  city,
  profile_image,
}) => {
  const [formData, setFormData] = useState({
    nickname,
    state,
    city,
    profile_image,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API 호출 로직
    alert('프로필 수정 완료');
  };
  return (
    <>
      {/* 헤더영역 => 컴포넌트화 */}
      <SimpleHeader title={'프로필 수정'} />
      <div className="">
        <h2 className="text-xl font-bold mb-4">내 정보 수정</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* 닉네임 */}
          <label>
            닉네임
            <input
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </label>

          {/* 지역 */}
          <label>
            시/도
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </label>
          <label>
            시/군/구
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </label>

          {/* 프로필 이미지 URL 입력 (또는 추후 파일 업로드로 변경 가능) */}
          <label>
            프로필 이미지
            <input
              type="text"
              name="profile_image"
              value={formData.profile_image}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </label>

          <button
            type="submit"
            className="bg-primary text-white py-2 px-4 rounded hover:bg-primary/90"
          >
            저장
          </button>
        </form>
      </div>
    </>
  );
};

export default ProfileUpdate;
