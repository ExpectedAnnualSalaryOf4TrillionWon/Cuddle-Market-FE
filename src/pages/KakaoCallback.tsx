import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface KakaoAuthData {
  code: string;
  timestamp: string;
  redirectUri: string;
  clientId: string;
}

const KakaoCallback: React.FC = () => {
  const [authCode, setAuthCode] = useState<string | null>(null);
  const KAKAO_CLIENT_ID: string = import.meta.env.VITE_KAKAO_CLIENT_ID || '';
  const REDIRECT_URI: string =
    import.meta.env.VITE_KAKAO_REDIRECT_URI || `${window.location.origin}/oauth/kakao/callback`;
  const navigate = useNavigate();

  const handleAuthCode = async (code: string): Promise<void> => {
    try {
      console.log('📝 인가코드 처리 시작');

      // 디버깅용 데이터 저장
      const authData: KakaoAuthData = {
        code: code,
        timestamp: new Date().toISOString(),
        redirectUri: REDIRECT_URI,
        clientId: KAKAO_CLIENT_ID.substring(0, 10) + '...',
      };

      // 백엔드로 전달하는 코드로 바뀌어야 함.
      localStorage.setItem('kakaoAuthData', JSON.stringify(authData));

      console.log(`카카오 인가코드를 받았습니다`);
    } catch (error) {
      console.error('❌ 인가코드 처리 에러:', error);
      alert('인가코드 처리 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    // 카카오에서 리다이렉트된 경우 처리
    const urlParams = new URLSearchParams(window.location.search);
    const code: string | null = urlParams.get('code');
    const error: string | null = urlParams.get('error');

    if (error) {
      console.error('❌ 카카오 로그인 에러:', error);
      let errorMessage: string = '카카오 로그인 중 오류가 발생했습니다.';

      switch (error) {
        case 'access_denied':
          errorMessage = '카카오 로그인이 거부되었습니다.';
          break;
        case 'invalid_request':
          errorMessage = '잘못된 요청입니다. 다시 시도해주세요.';
          break;
      }

      alert(errorMessage);
      return;
    }

    if (code) {
      console.log('✅ 카카오 인가코드 수신:', code);
      setAuthCode(code);
      handleAuthCode(code);
      navigate('/');
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <p className="text-lg mb-4">카카오 로그인 처리 중...</p>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500 mx-auto"></div>
      </div>
    </div>
  );
};

export default KakaoCallback;
