import { useAuthStore } from '@store/authStore';
import { useModalStore } from '@store/modalStore';
import { useNavigate } from 'react-router-dom';

// 상태관리 props 전달을 위한 타입설정
interface UserDropdownProps {
  isOpen: boolean;
  // 드롭다운 활성화 여부는 boolean값을 통해 변경하게 된다.
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  //setIsOpen은 React.useState로부터 생성된 set함수로 boolean 값을 변경할 수 있는 타입이다.

  // isLoggedIn: boolean;
  // // 로그인 여부도 boolean 값을 통해 확인 후 다른 드롭다운 메뉴를 출력하게 된다.
  // setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

/* 유저 드롭다운 기능*/
/* 타입은 리액트 함수형 컴포넌트(React.FX)이고, 위에 상태관리 타입설정도 props로 전달한다.*/
const UserDropdown: React.FC<UserDropdownProps> = ({
  isOpen,
  setIsOpen,
  // isLoggedIn,
  // setIsLoggedIn,
}) => {
  const { isLoggedIn, login, logout } = useAuthStore();
  // 전역상태관리로 바꾼 로그인여부 호출, 기존 로그인상태관리 주석처리.
  if (!isOpen) return null;
  // 드롭다운 활성화 boolean값이 false면 드롭다운이 사라진다.
  const navigate = useNavigate();
  const goToSignIn = () => {
    navigate('/signin');
  };
  const goToMyPage = () => {
    navigate('/mypage');
  };
  // 로그아웃 확인 모달 설정
  const confirm = useModalStore(state => state.confirm);
  const handleLogout = async () => {
    const result = await confirm('로그아웃 하시겠습니까?');
    if (result === true) {
      logout();
    } else {
      return;
    }
  };
  return (
    <div className="absolute right-5 top-full mt-3 w-30 bg-point shadow-lg rounded-md border border-border z-50 opacity-85">
      {!isLoggedIn /*로그인이 안 되어있을 경우*/ ? (
        <>
          <button
            className="w-full px-md py-xs hover:bg-gray-100 transition"
            onClick={e => {
              setIsOpen(false);
              goToSignIn(e);
            }}
          >
            로그인
          </button>
          {/*로그인/로그아웃 상태변경 여부 확인용 테스트버튼*/}
          <button
            className="w-full px-md py-xs hover:bg-gray-100 transition"
            onClick={() => {
              setIsOpen(false);
              login();
            }}
          >
            테스트
          </button>
        </>
      ) : (
        /*로그인이 되어있을 경우*/
        <>
          <button
            className="w-full px-md py-xs hover:bg-dark transition"
            onClick={e => {
              setIsOpen(false);
              goToMyPage(e);
            }}
          >
            마이페이지
          </button>

          <button className="w-full px-md py-xs hover:bg-dark transition" onClick={handleLogout}>
            로그아웃
          </button>
        </>
      )}
    </div>
  );
};

export default UserDropdown;
