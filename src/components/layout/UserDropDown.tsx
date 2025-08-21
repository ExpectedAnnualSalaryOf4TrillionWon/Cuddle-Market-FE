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
  const navigate = useNavigate();
  const { isLoggedIn, login, logout } = useAuthStore();
  const logoutconfirm = useModalStore(state => state.confirm);
  //react 훅의 사용규칙 중에는 훅의 호출이 반드시 컴포넌트 상단에 위치하여야 한다(런타임 에러의 원인이 될 수 있다)라는 룰이 있고 이를 ESlint가 지적하여 코드상에 경고가 발생함.
  // 때문에 상단으로 이동하는 것을 수정.
  // 오히려 eslint가 제대로 작동하면서 나온 안내성 경고였음.

  // 전역상태관리로 바꾼 로그인여부 호출, 기존 로그인상태관리 주석처리.
  if (!isOpen) return null;
  // 드롭다운 활성화 boolean값이 false면 드롭다운이 사라진다.

  const goToSignIn = () => {
    navigate('/signin');
  };
  const goToMyPage = () => {
    navigate('/mypage');
  };

  const goToProductPost = () => {
    navigate('/product-post');
  };
  // 로그아웃 확인 모달 설정

  const handleLogout = async () => {
    const result = await logoutconfirm('로그아웃 하시겠습니까?');
    if (result === true) {
      logout();
    } else {
      return;
    }
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
              login();
              setIsOpen(false);
            }}
          />
        </>
      ) : (
        /*로그인이 되어있을 경우*/
        <>
          <DropdownButton label={'마이페이지'} onClick={goToMyPage} />
          <DropdownButton label={'로그아웃'} onClick={handleLogout} />
          <DropdownButton label={'상품 등록'} onClick={goToProductPost} />
        </>
      )}
    </div>
  );
};

export default UserDropdown;
