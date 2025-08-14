import Footer from '@layout/Footer';
import { useLocation } from 'react-router-dom';
import ChatButton from './features/chat/ChatButton';
import AppRoutes from './routes/index';

function App() {
  const location = useLocation();
  const showMainHeader = location.pathname === '/' || location.pathname.startsWith('/products/');

  return (
    <>
      <AppRoutes />
      <ChatButton />
      <Footer />
    </>
  );
}

export default App;
