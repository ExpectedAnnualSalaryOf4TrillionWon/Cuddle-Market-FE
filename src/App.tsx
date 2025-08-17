import ChatButton from './features/chat/ChatButton';
import AppRoutes from './routes/index';
import ConfirmModal from '@common/confirmModal';

function App() {
  return (
    <>
      <AppRoutes />
      <ChatButton />

      <Footer />
      <ConfirmModal />

    </>
  );
}

export default App;
