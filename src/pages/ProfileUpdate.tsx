// TODO: ProfileUpdate 컴포넌트 리팩토링 예정
import { SimpleHeader } from '@src/components/layouts/SimpleHeader';

function ProfileUpdate() {
  // 임시로 간단한 UI만 표시
  return (
    <>
      <SimpleHeader title="내 정보 수정" />
      <div className="max-w-[var(--container-max-width)] mx-auto px-lg py-md tablet:pb-xl tablet:pt-[10vh]">
        <div className="flex items-center justify-center h-96">
          <p className="text-lg text-gray-500">프로필 수정 페이지 리팩토링 예정</p>
        </div>
      </div>
    </>
  )
}

export default ProfileUpdate;
