import Footer from '@layout/Footer';
import ChatButton from './features/chat/ChatButton';
import AppRoutes from './routes/index';
import ConfirmModal from '@common/confirmModal';

function App() {
  return (
    <>
      <AppRoutes />
      <Footer />
      <ChatButton />

      <Footer />
      <ConfirmModal />

    </>
  );
}

export default App;
