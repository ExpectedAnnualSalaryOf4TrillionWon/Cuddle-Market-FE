import Footer from '@layout/Footer';
import { useLocation } from 'react-router-dom';
import ChatButton from './features/chat/ChatButton';
import AppRoutes from './routes/index';
import ConfirmModal from '@common/confirmModal';

function App() {
  const location = useLocation();
  const showMainHeader = location.pathname === '/' || location.pathname.startsWith('/products/');

  return (
    <>
      <AppRoutes />
      <ChatButton />
      <Footer />
      <ConfirmModal />
      {/* 모달창 최상단 활성화를 위한 라우트 위치 설정, 상태는 전역으로 관리하여 전달 */}
    </>
  );
}

export default App;
