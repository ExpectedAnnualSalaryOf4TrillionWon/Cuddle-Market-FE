import Footer from '@layout/Footer';
import { useLocation } from 'react-router-dom';
import MainHeader from './components/layout/Header';
import ChatButton from './features/chat/ChatButton';
import AppRoutes from './routes/index';

function App() {
  const location = useLocation();
  const showMainHeader = location.pathname === '/' || location.pathname.startsWith('/products/');

  return (
    <>
      {showMainHeader && <MainHeader />}
      <ChatButton />
      <AppRoutes />
      <Footer />
    </>
  );
}

export default App;
