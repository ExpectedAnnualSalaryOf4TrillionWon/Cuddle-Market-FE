import ChatButton from './features/chat/ChatButton';
import { useLocation } from 'react-router-dom';
import MainHeader from './components/layout/Header';

function App() {
  const location = useLocation();
  const showMainHeader = location.pathname === '/' || location.pathname.startsWith('/products/');

  return (
    <>
      {showMainHeader && <MainHeader />}
      <ChatButton />
      <p className="font-custom text-7xl">Hello,World!</p>
    </>
  );
}

export default App;
