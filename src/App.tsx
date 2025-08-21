import ConfirmModal from '@common/confirmModal';
import Footer from '@layout/Footer';
import ChatButton from './features/chat/ChatButton';
import AppRoutes from './routes/index';

function App() {
  return (
    <>
      <AppRoutes />
      <Footer />
      <ChatButton />
      <ConfirmModal />
    </>
  );
}

export default App;
