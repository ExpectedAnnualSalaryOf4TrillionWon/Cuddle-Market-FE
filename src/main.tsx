import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import './index.css';

// React Query 클라이언트 생성
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // 윈도우 포커스 시 자동 refetch 비활성화
      retry: 1, // 실패 시 1번만 재시도
    },
  },
});

// MSW 주석 처리
// const enableMocking = async () => {

//   // 개발환경에서만 실행하기 위해, 개발환경이 아니면 함수 반환
//   if (!import.meta.env.DEV) {
//     return;
//   }


//   // MSW 를 실행하기 위한 import
//   const { worker } = await import('./mock/browser.ts');


//   return worker.start({
//     onUnhandledRequest(request, print) {
//       if (
//         request.url.includes('/users/kakao-auth/') ||
//         request.url.includes('/users/profile-complete/') ||
//         request.url.includes('/categories/all-get/') ||
//         request.url.includes('/likes')
//       ) {
//         return;
//       }
//       print.warning();
//     },
//   });
// };

// MSW 비활성화 - 실제 API 호출
// enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>,
  );
// });
