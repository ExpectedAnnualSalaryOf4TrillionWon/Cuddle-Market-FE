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
      {/* 모달창 최상단에 활성화 */}
    </>
  );
}

export default App;
