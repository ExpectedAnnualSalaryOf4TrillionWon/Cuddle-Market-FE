import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

const enableMocking = async () => {
  
  // 개발환경에서만 실행하기 위해, 개발환경이 아니면 함수 반환
  if (!import.meta.env.DEV) {
    return;
  }

  
  // MSW 를 실행하기 위한 import
  const { worker } = await import('./mock/browser.ts');


  return worker.start({
    onUnhandledRequest(request, print) {
      if (
        request.url.includes('/users/kakao-auth/') ||
        request.url.includes('/users/profile-complete/') ||
        request.url.includes('/categories/all-get/') ||
        request.url.includes('/likes')
      ) {
        return;
      }
      print.warning();
    },
  });
};

// MSW 연결후 React
enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
});
