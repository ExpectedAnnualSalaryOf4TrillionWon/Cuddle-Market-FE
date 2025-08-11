import { useLocation } from 'react-router-dom';
import Footer from '@layout';
import MainHeader from './components/layout/Header';
import ChatButton from './features/chat/ChatButton';
function App() {
  const location = useLocation();
  const showMainHeader = location.pathname === '/' || location.pathname.startsWith('/products/');

  return (
    <>
      {showMainHeader && <MainHeader />}
      <ChatButton />

      <h1
        className="heading1 p-md 
          bg-blue-300                
          tablet:bg-green-300 
          desktop:bg-red-300
          text-alert"
      >
        헤딩1 입니다
      </h1>
      <p className="bodyLarge">Hello,World!</p>
      <Footer />
    </>
  );
}

export default App;
