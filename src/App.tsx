import ConfirmModal from '@common/confirmModal';
import ChatButton from './features/chat/ChatButton';
import AppRoutes from './routes/index';

function App() {
  return (
    <>
      <AppRoutes />
      <ChatButton />
      <ConfirmModal />
    </>
  );
}

export default App;
