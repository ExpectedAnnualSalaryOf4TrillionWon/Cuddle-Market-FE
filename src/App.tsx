import Footer from '@layout/Footer';
import { useLocation } from 'react-router-dom';
import ChatButton from './features/chat/ChatButton';
import AppRoutes from './routes/index';

function App() {
  const location = useLocation();
  return (
    <>
      <AppRoutes />
      <ChatButton />
      <Footer />
    </>
  );
}

export default App;
