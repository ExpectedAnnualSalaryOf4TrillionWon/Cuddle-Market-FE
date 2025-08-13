import { useNavigate } from 'react-router-dom';
import logo from '@images/CuddleMarketLogoImage.png';

const Login = () => {
  const navigate = useNavigate();

  const handleKakaoLogin = () => {
    alert(
      '카카오톡 로그인 기능을 연동해주세요!\n\n실제 서비스에서는 카카오 개발자 센터에서\nJavaScript SDK를 설정하시면 됩니다.',
    );
    setTimeout(() => {
      alert('로그인이 완료되었습니다! 🎉\n커들마켓에 오신 것을 환영합니다!');
      navigate('/');
    }, 1000);
  };

  const handleEmailLogin = () => {
    alert('이메일 로그인 페이지로 이동합니다.');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <div className="flex justify-center bg-secondary pb-4">
      <div className="max-w-6xl bg-point">
        <div className="rounded-3xl p-10 shadow-xl text-center w-full relative transform transition-all duration-500 hover:scale-105">
          <div className="mb-12">
            {/* 수정된 부분 - public 폴더의 이미지를 직접 경로로 참조 */}
            <div className="w-32 h-32 mx-auto mb-6 bg-gray-50 rounded-3xl flex items-center justify-center border-4 border-dashed border-blue-200 overflow-hidden">
              <img src={logo} alt="Cuddle Market 로고" className="w-full h-full object-contain" />
            </div>
            <div className="text-2xl font-bold text-blue-200 tracking-wide">CUDDLE MARKET</div>
          </div>

          <div className="space-y-4 mb-6">
            <button
              onClick={handleKakaoLogin}
              className="w-full bg-yellow-400 text-gray-800 py-5 px-8 rounded-full text-base font-bold
                         transition-all duration-300 transform hover:scale-105 hover:bg-yellow-300 hover:shadow-lg
                         flex items-center justify-center gap-3 flex-nowrap nobreakstyle"
            >
              <div className="w-5 h-5 bg-gray-800 rounded-full flex items-center justify-center text-xs text-yellow-400 font-bold">
                K
              </div>
              <span className="inline-block">카카오로 3초 만에 시작하기</span>
            </button>

            <button
              onClick={handleEmailLogin}
              className="w-full bg-gray-200 text-gray-600 py-5 px-8 rounded-full text-base font-medium
                         transition-all duration-300 transform hover:scale-105 hover:bg-gray-300 flex-nowrap nobreakstyle"
            >
              <span className="inline-block">이메일로 시작하기</span>
            </button>
          </div>

          <button
            onClick={handleSignupClick}
            className="text-gray-400 text-sm hover:text-blue-200 transition-colors duration-300"
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
