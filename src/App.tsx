import { useLocation } from 'react-router-dom';
import Footer from '@layout/Footer';
import MainHeader from './components/layout/Header';
import ChatButton from './features/chat/ChatButton';
import Home from './pages/Home';

function App() {
  const location = useLocation();
  const showMainHeader = location.pathname === '/' || location.pathname.startsWith('/products/');

  return (
    <>
      {showMainHeader && <MainHeader />}
      <Home />
      <ChatButton />

      <Footer />
    </>
  );
}

export default App;
