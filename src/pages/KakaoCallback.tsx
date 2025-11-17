import { useUserStore } from '@store/userStore';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import type { User } from 'src/types';

interface KakaoAuthResponse {
  access: string;
  user: User;
}

function KakaoCallback() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchParams] = useSearchParams();
  const { handleLogin, redirectUrl, setRedirectUrl } = useUserStore();

  const code: string | null = searchParams.get('code');
  const error: string | null = searchParams.get('error');
  const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  const handleAuthCode = async (code: string): Promise<void> => {
    try {
      setIsLoading(true);

      console.log(code);

      const response = await fetch(`${API_BASE_URL}/users/kakao-auth/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      const data: KakaoAuthResponse = await response.json();
      console.log('응답 데이터:', data);

      if (data.access && data.user) {
        handleLogin(data.user, data.access);
        console.log('사용자 정보 저장 완료');
      }

      if (data.user.profile_completed === false) {
        console.log('신규회원입니다.');
        setRedirectUrl(null);
        navigate('/signup');
      } else {
        console.log('기존 회원입니다.');
        if (redirectUrl) {
          const targetUrl = redirectUrl;
          console.log('저장된 페이지:', targetUrl);
          setRedirectUrl(null); // 사용 후 초기화
          navigate(targetUrl, { replace: true });
        } else {
          console.log('홈으로 이동');
          navigate('/', { replace: true });
        }
      }
    } catch (error) {
      console.error('인가코드 처리 에러:', error);
      alert('인가코드 처리 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false); // ✅ finally 블록 추가
    }
  };

  useEffect(() => {
    if (error) {
      console.error('카카오 로그인 에러:', error);
      return;
    }

    if (code) {
      console.log('카카오 인가코드 수신:', code);
      handleAuthCode(code);
      navigate('/');
    }
  }, [searchParams, navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <p className="text-lg mb-4"> {isLoading ? '카카오 로그인 처리 중...' : '로그인 완료!'}</p>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500 mx-auto"></div>
      </div>
    </div>
  );
}

export default KakaoCallback;
