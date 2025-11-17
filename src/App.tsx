// import './App.css';
// vim 사용예시 커밋 작성

import Footer from '@src/components/commons/footer/Footer';
import ChatButton from './features/chat/ChatButton';
import AppRoutes from './routes/index';
function App() {
  return (
    <>
      <AppRoutes />
      <Footer />
      <ChatButton />
    </>
  );
}

export default App;
