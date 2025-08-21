import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import type { User } from 'src/types';

interface KakaoAuthResponse {
  access: string;
  user: User;
}

const KakaoCallback: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchParams] = useSearchParams();

  const code: string | null = searchParams.get('code');
  const error: string | null = searchParams.get('error');

  const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  const handleAuthCode = async (code: string): Promise<void> => {
    try {
      setIsLoading(true);

      const requestBody = {
        code,
      };

      const response = await fetch(`${API_BASE_URL}/users/kakao-auth/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data: KakaoAuthResponse = await response.json();
      console.log('📍 응답 데이터:', data);

      // 토큰과 사용자 정보 저장
      if (data.access) {
        localStorage.setItem('access_token', data.access);
        console.log('✅ 토큰 저장 완료');
      }

      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('user_id', String(data.user.id));
        localStorage.setItem('user_nickname', data.user.nickname || '');
        console.log('✅ 사용자 정보 저장 완료');
      }

      if (data.user.profile_completed === false) {
        console.log('신규회원입니다.');
        localStorage.removeItem('redirectUrl');
        navigate('/signup');
      } else {
        console.log('기존 회원입니다.');
        const redirectUrl = localStorage.getItem('redirectUrl');

        if (redirectUrl) {
          localStorage.removeItem('redirectUrl');
          console.log('📍 저장된 페이지로 이동:', redirectUrl);
          navigate(redirectUrl, { replace: true });
        } else {
          console.log('📍 홈으로 이동');
          navigate('/', { replace: true });
        }
      }
    } catch (error) {
      console.error('❌ 인가코드 처리 에러:', error);
      alert('인가코드 처리 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    console.log('📍 Search Params 전체:', searchParams.toString());
    if (error) {
      console.error('카카오 로그인 에러:', error);
      let errorMessage: string = '카카오 로그인 중 오류가 발생했습니다.';

      switch (error) {
        case 'access_denied':
          errorMessage = '카카오 로그인이 거부되었습니다.';
          break;
        case 'invalid_request':
          errorMessage = '잘못된 요청입니다. 다시 시도해주세요.';
          break;
      }

      // 에러 처리해야 함
      alert(errorMessage);
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
};

export default KakaoCallback;
