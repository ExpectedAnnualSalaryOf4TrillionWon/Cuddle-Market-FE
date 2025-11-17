import ConfirmModal from '@src/components/commons/confirmModal';
import { DropdownButton } from '@src/components/commons/DropdownButton';
import { useUserStore } from '@store/userStore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { DropdownProps } from 'src/types/DropDownType';

// 상태관리 props 전달을 위한 타입설정은 재사용을 위해 types 폴더로 이동.
// 로그인 관련 Props는 전역상태관리로 바뀌었으므로 삭제

/* 유저 드롭다운 기능*/
/* 타입은 리액트 함수형 컴포넌트(React.FC)이고, 위에 상태관리 타입설정도 props로 전달한다.*/
function UserDropdown({ isOpen, setIsOpen }: DropdownProps) {
  const navigate = useNavigate();
  // const logoutconfirm = useModalStore(state => state.confirm);
  //react 훅의 사용규칙 중에는 훅의 호출이 반드시 컴포넌트 상단에 위치하여야 한다(런타임 에러의 원인이 될 수 있다)라는 룰이 있고 이를 ESlint가 지적하여 코드상에 경고가 발생함.
  // 때문에 상단으로 이동하는 것을 수정.
  // 오히려 eslint가 제대로 작동하면서 나온 안내성 경고였음.

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const user = useUserStore(state => state.user);
  const clearAll = useUserStore(state => state.clearAll);
  const isLoggedIn = useUserStore(state => state.isLogin());

  // 드롭다운이 열려있지 않으면 렌더링하지 않음
  if (!isOpen) return null;

  // 전역상태관리로 바꾼 로그인여부 호출, 기존 로그인상태관리 주석처리.
  // if (!isOpen) return null;
  // 드롭다운 활성화 boolean값이 false면 드롭다운이 사라진다.

  const goToSignIn = () => {
    navigate('/signin');
    setIsOpen(false);
  };
  const goToMyPage = () => {
    navigate('/mypage');
    setIsOpen(false);
  };

  const goToProductPost = () => {
    navigate('/product-post');
    setIsOpen(false);
  };

  // 로그아웃 모달 설정
  const handleLogout = () => {
    setModalMessage('로그아웃 하시겠습니까?');
    setIsModalOpen(true);
  };

  // 모달에서 확인 클릭 시
  const handleConfirmLogout = () => {
    clearAll(); // 로그아웃 실행
    setIsModalOpen(false);
    setIsOpen(false);
    navigate('/'); // 홈으로 이동 (선택사항)
  };

  const handleCancelLogout = () => {
    setIsModalOpen(false); // 모달만 닫기
  };

  return (
    <>
      <div className="absolute right-0 top-[110%] py-sm bg-point rounded-md z-2 opacity-90 flex flex-col whitespace-nowrap min-w-[7rem]">
        {!isLoggedIn /*로그인이 안 되어있을 경우*/ ? (
          <>
            {/* 드롭다운메뉴 내의 버튼 별도 컴포넌트화 */}
            <DropdownButton label={'로그인'} onClick={goToSignIn} />
          </>
        ) : (
          /*로그인이 되어있을 경우*/
          <>
            {user && (
              <div className="flex justify-center border-b pb-sm border-black/20 ">
                <p className="font-medium">{user.nickname}님</p>
              </div>
            )}
            <div className="flex flex-col pt-sm px-xs gap-xs">
              <DropdownButton label={'마이페이지'} onClick={goToMyPage} />
              <DropdownButton label={'로그아웃'} onClick={handleLogout} />
              <DropdownButton label={'상품 등록'} onClick={goToProductPost} />
            </div>
          </>
        )}
      </div>
      <ConfirmModal
        isOpen={isModalOpen}
        message={modalMessage}
        onConfirm={handleConfirmLogout}
        onCancel={handleCancelLogout}
      />
    </>
  );
};

export default UserDropdown;
