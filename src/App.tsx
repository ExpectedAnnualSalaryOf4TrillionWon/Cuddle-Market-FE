import Footer from '@layout/Footer';
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
