import { useAuthStore } from '@store/authStore';
import type { DropdownProps } from 'src/types/DropDownType';
import { useNavigate } from 'react-router-dom';

interface AlarmDivProps {
  message: string;
}

const AlarmDiv: React.FC<AlarmDivProps> = ({ message }) => {
  return (
    <div className="min-h-[5rem] px-md my-xs border border-secondary rounded-xl bg-white flex justify-center items-center">
      {message}
      {/* props로 내용 전달할 예정인데 타입지정에 대해 긴가민가하여 우선 생략 */}
    </div>
  );
};

/* 알람 드롭다운 기능*/
const AlarmDropdown: React.FC<DropdownProps> = ({ isOpen }) => {
  const { isLoggedIn } = useAuthStore();
  // 로그인 상태에 따른 알람 기능 활성화 여부를 설정하기 위한 전역상태 호출.
  if (!isOpen) return null;
  // 드롭다운 활성화 boolean값이 false면 드롭다운이 사라진다.
  const navigate = useNavigate();

  const gotoAlarmPage = () => {
    navigate('/alarm');
  };
  return (
    <div className="absolute right-12 top-full w-auto bg-point shadow-lg flex flex-col  rounded-xl border border-border z-50 opacity-65 whitespace-nowrap  min-w-[10rem]">
      {!isLoggedIn /*로그인이 안 되어있을 경우*/ ? (
        <AlarmDiv message="로그인이 필요합니다" />
      ) : (
        /*로그인이 되어있을 경우*/
        <>
          <AlarmDiv message="1번째 알림입니다." />
          <AlarmDiv message="2번째 알림입니다." />
          <AlarmDiv message="3번째 알림입니다." />
          <button
            className="text-heading4 bg-primary rounded-2xl my-xs hover:bg-dark"
            onClick={gotoAlarmPage}
          >
            더보기
          </button>
        </>
      )}
    </div>
  );
};

export default AlarmDropdown;
