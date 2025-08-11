import Home from '@pages/Home';
import { useLocation } from 'react-router-dom';
import MainHeader from './components/layout/Header';
import ChatButton from './features/chat/ChatButton';

function App() {
  const location = useLocation();
  const showMainHeader = location.pathname === '/' || location.pathname.startsWith('/products/');

  return (
    <>
      {showMainHeader && <MainHeader />}
      <Home />
      <ChatButton />
    </>
  );
}

export default App;
