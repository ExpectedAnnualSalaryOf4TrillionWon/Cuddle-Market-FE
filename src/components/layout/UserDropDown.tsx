import { useAuthStore } from '@store/authStore';
import type { DropdownProps } from 'src/types/DropDownType';
import { DropdownButton } from '@common/DropdownButton';
import { useModalStore } from '@store/modalStore';
import { useNavigate } from 'react-router-dom';

// 상태관리 props 전달을 위한 타입설정은 재사용을 위해 types 폴더로 이동.
// 로그인 관련 Props는 전역상태관리로 바뀌었으므로 삭제

/* 유저 드롭다운 기능*/
/* 타입은 리액트 함수형 컴포넌트(React.FC)이고, 위에 상태관리 타입설정도 props로 전달한다.*/
const UserDropdown: React.FC<DropdownProps> = ({ isOpen, setIsOpen }) => {
  const { isLoggedIn, login, logout } = useAuthStore();
  // 전역상태관리로 바꾼 로그인여부 호출, 기존 로그인상태관리 props 삭제.
  if (!isOpen) return null;
  // 드롭다운 활성화 boolean값이 false면 드롭다운이 사라진다.
  // navigate 관련 함수도 한 파일에 정렬하여 호출하기 위해 routes 폴더로 이동.

  // 로그아웃 확인 모달 설정 => 재사용성 향상을 위해 전역상태를 활용한 함수선언도 modalStore.ts로 이동. => 리액트 Hook 사용 규칙(hook의 호출 시점은 컴포넌트 내부여야 한다.)에 위배되어 오류발생으로 대대적인 수정이 필요하다 하여 기존 상태로 복구.
  const logoutconfirm = useModalStore(state => state.confirm);
  const handleLogout = async () => {
    const result = await logoutconfirm('로그아웃 하시겠습니까?');
    if (result === true) {
      logout();
    } else {
      return;
    }
  };
  const navigate = useNavigate();

  const goToSignIn = () => {
    navigate('/signin');
  };
  const goToMyPage = () => {
    navigate('/mypage');
  };
  return (
    <div className="absolute right-2 top-full bg-point rounded-xl z-50 opacity-65 flex flex-col whitespace-nowrap min-w-[5rem]">
      {!isLoggedIn /*로그인이 안 되어있을 경우*/ ? (
        <>
          {/* 드롭다운메뉴 내의 버튼 별도 컴포넌트화 */}
          <DropdownButton label={'로그인'} onClick={goToSignIn} />
          {/*로그인/로그아웃 상태변경 여부 확인용 테스트버튼*/}
          <DropdownButton
            label={'테스트'}
            onClick={() => {
              login(), setIsOpen(false);
            }}
          />
        </>
      ) : (
        /*로그인이 되어있을 경우*/
        <>
          <DropdownButton label={'마이페이지'} onClick={goToMyPage} />
          <DropdownButton label={'로그아웃'} onClick={handleLogout} />
        </>
      )}
    </div>
  );
};

export default UserDropdown;
